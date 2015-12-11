angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope','LoadPostsFactory','$stateParams',
  function($scope, LoadPostsFactory,$stateParams) {
    $scope.posts = LoadPostsFactory.posts;
    console.log('$scope.posts after factory loaded', $scope.posts);
    $scope.post = LoadPostsFactory.posts[$stateParams.id];

    $scope.upvotePost = function(post){
      console.log('in upvotePost ');
      console.log('post._id', post._id);
      LoadPostsFactory.upvotePost(post._id);
      post.upvotes++;
    };






}])


.controller('cameraCtrl', ['$scope','$state','CameraFactory','LocationFactory', function($scope, $state, CameraFactory, LocationFactory) {
  $scope.userPost = {
    upvotes: 0,
    comments: [],
    imageURI: undefined,
    caption: '',
    location: {}
  };

  // $scope.post.caption = "";
  $scope.takePicture = function(){
    CameraFactory.takePhoto()
      .then(function (imageData) {
        $scope.userPost.imageURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
          // An error occured. Show a message to the user
          console.log('error', err);
          $state.go('main.home');
      });
    // $scope.userPost.imageURI = 'yooooooo';
  };

  $scope.getLocation = function(){
    LocationFactory.getPosition()
      .then(function(position){
        $scope.userPost.location.long = position.coords.longitude;
        $scope.userPost.location.lat = position.coords.latitude;
      }, function(err){
        console.log('There was an error: ', err);
      });
  };
  $scope.$on('$ionicView.enter', function(){
    $scope.userPost.caption = "";
    $scope.takePicture();
    $scope.getLocation();
    console.log('success');
  });

  $scope.addPost = function(){
    console.log('this is the userPost being posted', $scope.userPost);
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
.controller('commentsCtrl',['$scope', '$stateParams', 'LoadPostsFactory', 'singlePost', function($scope, $stateParams, LoadPostsFactory, singlePost) {
  $scope.post = singlePost;

  document.addEventListener('deviceready', function(){
    var UUID = $cordovaDevice.getUUID();
    console.log('This is the UUID: ', UUID);
  }, false);

  $scope.comment = { input: ""};
  $scope.addComment = function(){
    if(!$scope.comment.input) {return;}
    console.log('$scope.comment === obj ?', $scope.comment.input);

    LoadPostsFactory.addComment(singlePost._id, $scope.comment.input)
    .then(function(comment){
      console.log('inside controller then..comment =?', comment);
    });

    //update users comment view
    $scope.post.comments.push($scope.comment.input);
    $scope.comment.input = "";
  };
}])



//controller for interacting with the map view
.controller('mapCtrl',['$scope', '$ionicLoading', 'LocationFactory', 'LoadPostsFactory', function($scope, $ionicLoading, LocationFactory, LoadPostsFactory) {

  $scope.radius = {
    min : "1609.34",
    max : "80467.2",
    value: "40233.6"
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

        var mapOptions = {
          center: latLng,
          disableDoubleClickZoom: false,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: $scope.map,
            center: latLng,
            radius: $scope.radius
          });

        //modifies circle radius whenever user interacts with range bar
        google.maps.event.addDomListener(document.getElementById("radius"), 'drag', function(){
          // alert('clicked!');
          var rad = parseInt($scope.radius.value, 10);
          circle.setRadius(rad);
        });
      }, function(error){
        console.log("Could not get location");
      });

  };

  $scope.$on('$ionicView.enter', function(){
    $scope.getLocation();
    console.log('success');
  });



}])



//for future app start up page
.controller('splashPageCtrl',['$scope', '$cordovaDevice', function($scope, $cordovaDevice) {


}]);


/*controller for loading screen
http://pathgather.github.io/please-wait/
http://ionicframework.com/docs/api/service/$ionicLoading/
*/
