angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/caption', {
        templateUrl: 'views/caption.jade',
        controller: 'CaptionController'
      });

    $locationProvider.html5Mode(true);
  }]);