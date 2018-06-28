var express = require('express');
var ws = require('./ws');
var cors = require('cors');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ws.html');
});

app.use(cors());

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
