angular.module('CaptionService', [])
  .factory('Caption', ['$http', function($http) {
    return {
      get : function(id) {
        return $http.get('/captions/' + id);
      }
    }
  }]);