angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope','LoadPostsFactory','$stateParams',function($scope, LoadPostsFactory,$stateParams) {
  $scope.posts = LoadPostsFactory.posts;
  console.log('$scope.posts after factory loaded', $scope.posts);
  $scope.post = LoadPostsFactory.posts[$stateParams.id];

}])


.controller('cameraCtrl', ['$scope','$state','CameraFactory','LocationFactory',function($scope, $state, CameraFactory, LocationFactory) {

  $scope.post = {
    upvotes: 0,
    comments: [],
    imageURI: undefined,
    caption: '',
    location: {}
  };

  $scope.takePicture = function(){
    // CameraFactory.takePhoto()
    //   .then(function (imageData) {
    //     $scope.post.imageURI = "data:image/jpeg;base64," + imageData;
    //     }, function (err) {
    //       // An error occured. Show a message to the user
    //       console.log('error', err);
    //   });
    $scope.post.imageURI = 'yooooooo';
  };

  $scope.getLocation = function(){
    LocationFactory.getPosition()
      .then(function(position){
        $scope.post.location.long = position.coords.longitude;
        $scope.post.location.lat = position.coords.latitude;
      }, function(err){
        console.log('There was an error: ', err);
      });
  };

  $scope.addPost = function(){
    console.log('this is the post being posted', $scope.post);
    $scope.post.comments.push($scope.post.caption);

    CameraFactory.postPhoto($scope.post)
      .then(function(){
        console.log('posted! redirecting you now.');
        $state.go('main.home');
      })
      .catch(function(err){
        console.log('There was an error: ', err);
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

    $scope.post = LoadPostsFactory.posts[$stateParams.id];//obj
    console.log("$scope.post", $scope.post);


    $scope.addComment = function(){
      console.log('add comment worked??')
      if($scope.message === "" || $scope.message === undefined){return;}
      //clear input fields after submit
      $scope.message = '';
    };

}])



//controller for interacting with the map view
.controller('mapCtrl',['$scope','LocationFactory',function($scope, LocationFactory) {

  $scope.getLocation = function(){
    LocationFactory.getPosition()
      .then(function(position){
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      }, function(error){
        console.log("Could not get location");
      });
  }();

}])



//for future app start up page
.controller('splashPageCtrl',['$scope',function($scope) {
}]);


/*controller for loading screen
http://pathgather.github.io/please-wait/
http://ionicframework.com/docs/api/service/$ionicLoading/
*/
