angular.module('grouply.create', [])

.factory('Students', function($http) {
  return {
    addStudent: function(student) {
      console.log("you're in the Students factory")
      $http({
        method: 'POST',
        url: 'api/create/',
        data: JSON.stringify({student: student})
      })
      .then(function(res) {
        console.log('student added')
        return res;
      })
    }
  }

})

.controller('createController', function($scope, Students) {
  $scope.students = [];

  $scope.addStudent = function(student) {
    Students.addStudent(student);
    $scope.student = '';
  }
})