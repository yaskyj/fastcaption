angular.module('CaptionService', [])
  .factory('Caption', ['$http', function($http) {
    return {
      get: function(id) {
        $http.get('/captions/' + id)
          .success(function(data) {
            console.log(data);
            $scope.title = data[$$state].value.data.title;
          });
      }
    }
  }]
);