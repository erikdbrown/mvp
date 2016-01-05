var Student = require('./studentModel.js');
var Q = require('q');

module.exports = {

  addStudent: function(req, res, next) {
    console.log('you\'re in the addStudent server method');
    var student = req.body;
    console.log('Student: ', student)
    Student.create({first: 'Erik', last: 'Brown', age: 33}, function(err, newStudent) {
      if (err) throw err
      console.log(newStudent)
      res.send(newStudent);
    })
  }
}