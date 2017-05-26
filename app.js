var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var config = require('./config');
var routes = require('./app/routes');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/webhook', routes.get);
app.post('/webhook', routes.post);

app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send();
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});