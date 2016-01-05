angular.module('grouply.create', [])

.factory('Students', function($http, $location) {
  return {
    addStudents: function(students, next) {

      $http({
        method: 'POST',
        url: 'api/create/',
        data: JSON.stringify({students: students})
      })
      .then(function() {
        console.log('students added');
        next();
      })
    }
  }
})

.controller('createController', function($scope, $location, Students) {
  $scope.students = [];
  $scope.student = {};
  $scope.student.styles = {};

  $scope.addToList = function() {
    $scope.student.first = $scope.student.first.charAt(0).toUpperCase() + $scope.student.first.slice(1);
    $scope.student.last = $scope.student.last.charAt(0).toUpperCase() + $scope.student.last.slice(1);
    $scope.students.push($scope.student);
    $scope.student = {};
    $scope.student.styles = {};
  };

  $scope.addStudents = function() {
    Students.addStudents($scope.students, function() {
      $location.path('/links');
      $scope.students = [];
    })
  }
})