var re = /=(\w+)/,
    data,
    id;
angular.module('CaptionCtrl', [])
  .controller('CaptionController', ['$scope', 'Caption', function($scope, Caption) {
      $scope.onSearch = function() {
        id = $scope.videoUrl.match(re);
        $scope.resourceID = 'youtube' + id[1];
        console.log($scope.resourceID)
        data = Caption.get($scope.resourceID);
        $scope.captions = data['d'];
        // [$$state].value.data
        console.log($scope.captions);
      }
  }]);