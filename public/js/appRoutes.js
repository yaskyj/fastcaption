angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.jade',
        controller: 'CaptionController'
      });

    $locationProvider.html5Mode(true);
  }]);