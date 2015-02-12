angular.module('CaptionService', [])
  .factory('Caption', ['$http', function($http) {
    return $http.get('/captions');
  }
}]);