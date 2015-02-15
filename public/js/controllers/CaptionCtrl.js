var re = /=(\w+)/,
    id;
angular.module('CaptionCtrl', [])
  .controller('CaptionController', ['$scope', '$window', function($scope, $window) {
      $scope.onSearch = function() {
        id = $scope.videoUrl.match(re);
        $scope.resourceID = 'youtube' + id[1];
        console.log($scope.resourceID)
        $scope.captions = CaptionService.get($scope.resourceID);
        console.log($scope.captions);
      }
  }]);