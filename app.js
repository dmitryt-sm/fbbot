var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send();
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});