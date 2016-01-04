angular.module('app', [])

.factory('Students', function($http) {
  return {
    addStudent: function(student) {
      $http({
        method: 'POST',
        url: '/api/create',
        data: student
      })
      .then(function(res) {
        console.log('student added')
        return res;
      })
    }
  }

})

.controller('simpleController', function($scope, Students) {
  $scope.students = [];

  $scope.addStudent = function(student) {
    Students.addStudent(student);
    $scope.student = '';
  }
})