var re = /=(\w+)/,
    data,
    id;
angular.module('CaptionCtrl', [])
  .controller('CaptionController', ['$scope', '$http', function($scope, $http) {
      $scope.onSearch = function() {
        id = $scope.videoUrl.match(re);
        $scope.resourceID = 'youtube' + id[1];
        $http.get('/captions/' + $scope.resourceID)
            .success(function(data) {
              console.log(data);
              // $scope.title = data.title;
              // $scope.captions = data.captions;
              // console.log($scope.title);
              // console.log($scope.captions);
        });
        console.log($scope.resourceID)
      }

      $scope.testLog = function() {
        console.log($scope.title);
        console.log($scope.captions);
      }
  }]);