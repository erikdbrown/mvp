angular.module('grouply', [
  'grouply.create', 
  'ngRoute'
  ])

.config(function ($routeProvider) {
  $routeProvider
    .when('/create', {
      templateUrl: 'app/create/create.html',
      controller: 'createController'
    })
    .otherwise({
      redirectTo: '/create'
    })
});