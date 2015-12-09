angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', 'LoadPostsFactory', '$stateParams', function($scope, LoadPostsFactory,$stateParams) {
  $scope.posts = LoadPostsFactory.posts;
  console.log('$scope.posts after factory loaded', $scope.posts);
  // $scope.post = LoadPostsFactory.posts[$stateParams.id];

}])


.controller('cameraCtrl', ['$scope','$state','CameraFactory','LocationFactory',function($scope, $state, CameraFactory, LocationFactory) {

  //sets default values for userpost
  $scope.userPost = {
    upvotes: 0,
    comments: [],
    imageURI: undefined,
    caption: '',
    location: {}
  };

  /*
  prompts user to take picturem most of the fuction body is commented because
  the Camera object is not defined outside of a mobile device so for testing purposes
  I have added a random string('yooooooo') in place of an actual image
  */
  $scope.takePicture = function(){
    // CameraFactory.takePhoto()
    //   .then(function (imageData) {
    //     $scope.userPost.imageURI = "data:image/jpeg;base64," + imageData;
    //     }, function (err) {
    //       // An error occured. Show a message to the user
    //       console.log('error', err);
    //   });
    $scope.userPost.imageURI = 'yooooooo';
  }();

  //this is an IIFE same as the takePicture fuction so that the user will not
  //have to click an extra button after moving to the camera view
  $scope.getLocation = function(){
    LocationFactory.getPosition()
      .then(function(position){
        $scope.userPost.location.long = position.coords.longitude;
        $scope.userPost.location.lat = position.coords.latitude;
      }, function(err){
        console.log('There was an error: ', err);
      });
  }();

  //
  $scope.addPost = function(){
    console.log('this is the userPost being posted', $scope.userPost);
    //adding the capture caption to the comments array in the userPost object
    $scope.userPost.comments.push($scope.userPost.caption);

    CameraFactory.postPhoto($scope.userPost)
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

//in order to get the route parameters from the url (e.g, posts/{id}) we need to inject this $stateParams
.controller('commentsCtrl',['$scope', '$stateParams', 'LoadPostsFactory','singlePost', function($scope, $stateParams, LoadPostsFactory, singlePost) {
  $scope.post = singlePost;
  console.log('singlePost?--', $scope.post);



  $scope.addComment = function(){
    console.log('inside add comment');
    if($scope.message === "" || $scope.message === undefined){
      return;
    } else {
      console.log('enter worked');
      LoadPostsFactory.posts.push({comments: [$scope.message]});
      console.log('factory after', LoadPostsFactory);

    }
  };
}])



//controller for interacting with the map view
.controller('mapCtrl',['$scope', '$ionicLoading', '$ionicGesture', 'LocationFactory',function($scope, $ionicLoading, $ionicGesture, LocationFactory) {

  // var circle;

  $scope.radius = {
    min: '1609.34',
    max:'80467.2',
    value: '40233.6'
  };

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $scope.getLocation = function(){
    LocationFactory.getPosition()
      .then(function(position){

        $ionicLoading.hide();

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var radiusBar = document.getElementById("radius");
        var map = document.getElementById("map");

        var mapOptions = {
          center: latLng,
          disableDoubleClickZoom: true,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(map, mapOptions);

        //setting custom event in order to change the circles radiusBar
        // var customCircle = function(options){};
        // customCircle.prototype = new google.maps.Circle();
        // customCircle.prototype.changeRadius = changeRadius;

        var circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            // editable: true,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: $scope.map,
            center: latLng,
            radius: parseInt($scope.radius.value, 10)
          });

        google.maps.event.addDomListener(radiusBar, 'click', function(){
          // alert('clicked!');
          var rad = parseInt($scope.radius.value, 10);
          circle.setRadius(rad);
        });

        // google.maps.event.addDomListener(map, 'dblclick', function(){
        //   var rad = circle.getRadius();
        //   $scope.radius.value += rad;
        // });

      }, function(error){
        console.log("Could not get location: ", error);
      });
  }();

// console.log('this is circle: ', circle);
  // $ionicGesture.on('swipe', function(event){
  //   LocationFactory.getLocation()
  //     .then(function(position){
  //       var circle = new google.maps.Circle({
  //           strokeColor: '#FF0000',
  //           // editable: true,
  //           strokeOpacity: 0.8,
  //           strokeWeight: 2,
  //           fillColor: '#FF0000',
  //           fillOpacity: 0.35,
  //           map: $scope.map,
  //           center: latLng,
  //           radius: parseInt($scope.radius.value, 10)
  //         });
  //     });
  // }, elem);

}])



//for future app start up page
.controller('splashPageCtrl',['$scope',function($scope) {
}]);


/*controller for loading screen
http://pathgather.github.io/please-wait/
http://ionicframework.com/docs/api/service/$ionicLoading/
*/
