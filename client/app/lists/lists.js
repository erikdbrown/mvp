angular.module('grouply.lists', [])

.factory('Lists', function($scope, $http) {
  return {
    getList: function() {
      $http({
        method: 'GET',
        url: 'api/lists'
      })
      .then(function(res) {
        console.log('students received', res)
        $scope.students = res;
      })
    }
  }
})

.controller('listsController', function($scope, Lists) {
  Lists.getList()
  console.log($scope.students);
  $scope.students = [];
})