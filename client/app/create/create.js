angular.module('grouply.create', [])

.factory('Students', function($http) {
  return {
    addStudents: function(students) {

      $http({
        method: 'POST',
        url: 'api/create/',
        data: JSON.stringify({students: students})
      })
      .then(function(res) {
        console.log('students added')
        return res;
      })
    }
  }

})

.controller('createController', function($scope, Students) {
  $scope.students = [];
  $scope.student = {};

  $scope.addToList = function() {
    $scope.student.first = $scope.student.first.charAt(0).toUpperCase() + $scope.student.first.slice(1);
    $scope.student.last = $scope.student.last.charAt(0).toUpperCase() + $scope.student.last.slice(1);
    $scope.students.push($scope.student);
    $scope.student = {};
    // student = student.split(' ');

    // newStudent.age = $scope.age;
    // $scope.students.push(newStudent)
    // // Students.addStudent(student);
    // $scope.student = '';
  };

  $scope.addStudents = function() {
    Students.addStudents($scope.students);
    $scope.students = {};
  }
})