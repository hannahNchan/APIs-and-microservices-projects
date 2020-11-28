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
  const testDate = new Date(date.toString());

  if (testDate === 'Invalid Date') {
    res.json(dateError);
  } else {
    if (/\d{5,}/.test(date)) {
      res.json({ unix: parseInt(date), utc: new Date(parseInt(date)).toUTCString() });
    } else {
      res.json({ unix: new Date(date).valueOf(), utc: new Date(parseInt(date)).toUTCString() });
    }
  }

});



// listen for requests :)
//var listener = app.listen(process.env.PORT, function () {
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

