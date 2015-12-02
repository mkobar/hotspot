angular.module('app.controllers', [])

.controller('homeCtrl', [
  '$scope',
  'UserPosts',
  function($scope, UserPosts) {
    $scope.posts = UserPosts.posts;
}])


.controller('cameraCtrl', [
  '$scope',
  'Camera',
  function($scope, Camera) {

    $scope.takePhoto = function(){
      Camera.takePicture();
    };

    $scope.getPhoto = function() {
       Camera.getPicture().then(function(imageURI) {
         console.log(imageURI);
       }, function(err) {
         console.err(err);
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
