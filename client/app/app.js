angular.module('app', [])

.controller('simpleController', function($scope) {
  $scope.students = [];

  $scope.addStudent = function(student) {
    $scope.students.push(student);    
  }
})