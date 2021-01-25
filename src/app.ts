const express = require('express');
const app = express();

// Our first route
app.get('/', function (req, res) {
  res.send('Hello Node + GitHub!');
});

module.exports = app;