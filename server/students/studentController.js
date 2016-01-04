var Student = require('./studentModel.js');
var Q = require('q');

var addStudent = Q.nbind(Student.create, Student);