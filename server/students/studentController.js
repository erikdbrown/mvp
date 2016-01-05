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

    if (newStudents.length === 1 ) {
      Student.create(newStudents[0], function(err, students) {
        if (err) throw err
        next();
      })  
    } else {
      Student.create(newStudents, function(err, students) {
        if (err) throw err
        next();
      })
    }
  },

  allStudents: function(req, res, next) {
    console.log('you\'re in the allStudents controller method')
    Student.find({}).then(function(students) {
      res.json(students);
    })
    .fail(function(error) {
      next(error);
    })
  }
}