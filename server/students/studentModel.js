var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');

var StudentSchema = new mongoose.Schema({
  first: String,
  last: String,
  age: Number,
  styles: Array
});

StudentSchema.pre('save', function(next) {
  var student = this;
  next();
})

module.exports = mongoose.model('Students', StudentSchema);