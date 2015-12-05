angular.module('app.controllers', [])

.controller('homeCtrl', [
  '$scope',
  'LoadPostsFactory',
  '$stateParams',
   function($scope, LoadPostsFactory,$stateParams) {
  $scope.posts = LoadPostsFactory.posts;
  $scope.post = LoadPostsFactory.posts[$stateParams.id];

}])


.controller('cameraCtrl', ['$scope','CameraFactory', function($scope, CameraFactory) {

  $scope.$watch('picture', function(newValue, oldValue){
    console.log('its running');
  });

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


/*Controller for the comments view
- load comments that are associated with unique into
   this view
*/

.controller('commentsCtrl',[
  '$scope',
  '$stateParams', //in order to get the route parameters from the url (e.g, posts/{id}) we need to inject this $stateParams
  'LoadPostsFactory',
   function($scope, $stateParams, LoadPostsFactory) {
    // $scope.posts = LoadPostsFactory.posts;
    // console.log('LoadPostsFactory', LoadPostsFactory);
    $scope.post = LoadPostsFactory.posts[$stateParams.id];//obj
    console.log("$scope.post", $scope.post);

}])



//controller for interacting with the map view
.controller('mapCtrl',[
  '$scope',
   function($scope) {

}])



//for future app start up page
.controller('splashPageCtrl',[
  '$scope',
   function($scope) {
}]);





//***********addComment code (not complete)
// controller('', [
//   '$scope',
//   'posts',
//   function($scope, posts){
//     $scope.posts = posts.posts;

//     $scope.addComment = function(){
//       if($scope.message === "" || $scope.message === undefined){return;}
//       //clear input fields after submit
//       $scope.message = '';
//     };
// }])
