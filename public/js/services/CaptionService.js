angular.module('CaptionService', []).factory('Caption', ['$http', function($http) {
  return {
    get : function() {
      return $http.get('/captions');
    }
  }
}]);