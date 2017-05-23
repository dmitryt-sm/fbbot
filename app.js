var express = require('express');
var app = express();

var config = require('./config');

app.get('/', function (req, res) {
  res.send('Hello World!')
});

console.log(config);

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === config.VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send();
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});