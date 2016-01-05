var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var studentController = require('./students/studentController.js');

var app = express();

mongoose.connect('mongodb://localhost/grouply');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.post('/api/create', studentController.addStudents, function(req, res, next) {
  res.send();
  next();
});

app.get('/api/lists', studentController.allStudents, function(req, res, next) {
  res.send();
  next();
});

app.listen(8080);

module.exports = app;