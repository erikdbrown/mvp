angular.module('grouply.lists', [])

.factory('Lists', function($http) {
  return {
    getList: function() {
      return $http({
        method: 'GET',
        url: 'api/lists'
      })
      .then(function(res) {
        console.log('students received', res.data)
        return res.data;
      })
    }
  }
})

.controller('listsController', function($scope, Lists) {
  $scope.data = {};

  var displayStudents = function() {
    Lists.getList().then(function(students) {
      console.log('here\'s the list', students)
      $scope.data.list = students;
    })
    .catch(function(error) {
      console.log(error);
    })
  };

  displayStudents();
})