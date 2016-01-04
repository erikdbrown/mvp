var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var StudentSchema = new mongoose.Schema({
  first: String,
  last: String,
  age: Number
});

module.exports = mongoose.model('Student', StudentSchema);