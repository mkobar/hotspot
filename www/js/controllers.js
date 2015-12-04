angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope','LoadPostsFactory', function($scope, LoadPostsFactory) {

  $scope.posts = LoadPostsFactory.posts;

}])


.controller('cameraCtrl', ['$scope','$location','CameraFactory', function($scope, $location, CameraFactory) {

  $scope.takePicture = function(){
    CameraFactory.takePhoto()
      .then(function (imageData) {
        $scope.post.imageURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
          // An error occured. Show a message to the user
          console.log('error', err);
      });
  };

  $scope.post = {
    upvotes: 0,
    comments: [],
    imageURI: '',
    caption: '',
    location: ''
  };

  $scope.createPost = function(){
    CameraFactory.postPhoto($scope.image)
      .then(function(){
        $location.path('/');
      })
      .catch(function(err){
        console.log('There was an error: ', err);
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
