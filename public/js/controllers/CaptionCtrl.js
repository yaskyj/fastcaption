var re = /=(\w+)/,
    data,
    id;
angular.module('CaptionCtrl', [])
  .controller('CaptionController', ['$scope', '$http', function($scope, $http) {
      $scope.onSearch = function() {
        id = $scope.videoUrl.match(re);
        $scope.resourceID = 'youtube' + id[1];
        // $http.get('/caption/' + $scope.resourceID)
        //     .success(function(data) {
        //       console.log(data);
        //       $scope.captions = data.captions;
        //       // console.log($scope.title);
        //       // console.log($scope.captions);
        //     })
        //     .error(function(data) {
        //       console.log('This is the error');
        //     });
        console.log($scope.resourceID)
      }

  }]);