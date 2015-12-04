angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope','UserPosts', function($scope, UserPosts) {

  $scope.posts = UserPosts.posts;

}])


.controller('cameraCtrl', ['$scope','CameraFactory', function($scope, CameraFactory) {

  $scope.takePicture = function(){
    CameraFactory.takePhoto()
      .then(function (imageData) {
        $scope.image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
          // An error occured. Show a message to the user
          console.log('error', err);
      });

  };

}])

.controller('commentsCtrl',[
  '$scope',
   function($scope) {

}])

.controller('mapCtrl',[
  '$scope',
   function($scope) {

}])

//for future start up page
.controller('startUpCtrl',[
  '$scope',
   function($scope) {

}]);
