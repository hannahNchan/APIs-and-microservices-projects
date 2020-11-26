// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', (req, res) => {
  const dateNow = { unix: new Date().valueOf(), utc: new Date().toUTCString() };
  res.json(dateNow);
});

app.get('/api/timestamp/:date?', (req, res) => {
  const { date } = req.params;
  const dateError = { error : "Invalid Date" };
  let getDate;

  if (date.includes('-')) {
    if (date.replace('-','').split('').length < 6) res.json(dateError); 
    getDate = date;
  } else {
    if (date.toString().split('').length < 5) res.json(dateError);
    getDate = parseInt(date);
  }

  const unix = date.includes('-') ? new Date(date).valueOf() : parseInt(date);
  const utc = new Date(getDate).toUTCString();
  if (utc === 'Invalid Date') {
    res.json(dateError);
  } else {
    res.json({ unix, utc })
  }
});



// listen for requests :)
//var listener = app.listen(process.env.PORT, function () {
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
