angular.module('app.controllers', [])

.controller('homeCtrl', [
  '$scope',
  'UserPosts',
  function($scope, UserPosts) {
    $scope.posts = UserPosts.posts;
}])


.controller('cameraCtrl', [
  '$scope',
  '$cordovaCamera',
  function($scope, $cordovaCamera) {

    $scope.takePhoto = function (){

      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options)
        .then(function (imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function (err) {
              // An error occured. Show a message to the user
              console.log('error', err);
        });
    };

    $scope.choosePhoto = function () {

      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options)
        .then(function (imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
            console.log('error: ', err);
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
