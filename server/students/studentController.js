var Student = require('./studentModel.js');
var Q = require('q');

module.exports = {

  addStudent: function(req, res, next) {
    
    var student = req.body;
    
    Student.create({first: 'Erik', last: 'Brown', age: 33}, function(err, newStudent) {
      if (err) throw err
      console.log(newStudent)
      res.send(newStudent);
    })
  }
}