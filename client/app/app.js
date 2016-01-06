angular.module('grouply', [
  'grouply.create',
  'grouply.lists',
  'ngRoute'
  ])

.config(function ($routeProvider) {
  $routeProvider
    .when('/create', {
      templateUrl: 'app/create/create.html',
      controller: 'createController'
    })
    .when('/lists', {
      templateUrl: 'app/lists/lists.html',
      controller: 'listsController'
    })
    .otherwise({
      redirectTo: '/create'
    })
});