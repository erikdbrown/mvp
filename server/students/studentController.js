var Student = require('./studentModel.js');
var Q = require('q');

module.exports = {

  addStudents: function(req, res, next) {
    
    var newStudents = req.body.students.map(function(student) {
      return { 
        first: student.first, 
        last: student.last, 
        age: student.age 
      };
    })

    Student.create(newStudents, function(err, students) {
      if (err) throw err
      res.send(students)
    })
  }
}