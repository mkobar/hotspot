angular.module('app.controllers', [])


.controller('homeCtrl', ['$scope','LoadPostsFactory','$stateParams', 'LocationFactory', '$ionicLoading', function($scope, LoadPostsFactory,$stateParams, LocationFactory, $ionicLoading) {
    $scope.posts = LoadPostsFactory.posts;
    console.log('$scope.posts after factory loaded', $scope.posts);
    $scope.post = LoadPostsFactory.posts[$stateParams.id];

    $scope.$on('$ionicView.enter', function(){
      $ionicLoading.hide();
      $scope.bounds = parseInt(LocationFactory.radius.value,10) /1609.344;
    });

    $scope.upvotePost = function(post){
      LoadPostsFactory.upvotePost(post._id);
      post.upvotes++;
    };
}])

.controller('cameraCtrl', ['$scope','$state','CameraFactory','LocationFactory', '$ionicLoading', function($scope, $state, CameraFactory, LocationFactory, $ionicLoading) {
  $scope.userPost = {
    upvotes: 0,
    comments: [],
    imageURI: undefined,
    caption: '',
    location: {},
    hashtag:''
  };


  $scope.getLocation = function(){
    LocationFactory.getPosition()
      .then(function(position){
        $scope.userPost.location.lng = position.coords.longitude;
        $scope.userPost.location.lat = position.coords.latitude;
      }, function(err){
        console.log('There was an error: ', err);
      });
  };
  $scope.takePicture = function(){
    CameraFactory.takePhoto()
      .then(function (imageData) {
        $scope.userPost.imageURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
          // An error occured. Show a message to the user
          console.log('error', err);
          $state.go('main.home');
      });
    // $scope.userPost.imageURI = 'test';
  };

  $scope.$on('$ionicView.enter', function(){
    $scope.userPost.caption = "";
    $scope.userPost.imageURI = undefined;
    $scope.takePicture();
    $scope.getLocation();
    // console.log('success');
  });


  $scope.addPost = function(){
    var hashtags = [];
    var newArr = $scope.userPost.caption.split(" ");
    for(var i = 0; i < newArr.length; i++){
      if(newArr[i][0] === '#'){
        hashtags.push(newArr[i]);
        $scope.userPost.hashtag = hashtags.join(" ");
      }
    }
    console.log('this is the userPost being posted', $scope.userPost);
    // $scope.userPost.comments.push($scope.userPost.caption);

    $ionicLoading.show({
      template: 'Posting you photo, please-wait...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    CameraFactory.postPhoto($scope.userPost)
      .success(function(){
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
  $scope.posts = LoadPostsFactory.posts;
  $scope.radius = LocationFactory.radius;

  //shows the loading bar
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $scope.drawMap = function(){
    LocationFactory.getPosition() // changed getPosition - LocationFactory
    .then(function(position){

      $ionicLoading.hide();

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        disableDoubleClickZoom: false,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

       //changed map -$scope
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

/////////////////////////////////////// Map Circle //////////////////////////////////////////////////


      var circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: $scope.map, //changed map -$scope
        center: latLng,
        radius: parseInt($scope.radius.value,10) //radius.value - $scope
      });

      //modifies circle radius whenever user interacts with range bar
      google.maps.event.addDomListener(document.getElementById("radius"), 'drag', function(){
        // alert('clicked!');
        var rad = parseInt($scope.radius.value, 10); //radius.value - $scope
        circle.setRadius(rad);

        //removes markers from map
        $scope.markers.forEach(function(marker){
          marker.setMap(null);
        });

        $scope.markers = [];

        //adds new markers based on circle radius
        $scope.posts.forEach(function(post){
          if(post.distance < circle.radius/1609.344){
            createMarker(post);
          }
        });

      });



////////////////////////////////////// Map Markers //////////////////////////////////////////////////


      $scope.markers = [];

      var infoWindow = new google.maps.InfoWindow();

      var createMarker = function(post){
        var marker = new google.maps.Marker({
          position: post.location,
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          title: post.caption
        });
        marker.content = '<img src=' + post.imageURI + '>';
        marker.addListener('click', function(){
          infoWindow.setContent('<center><h2>' + marker.title + '</h2>' + marker.content + '</center>');
          infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
      };

      $scope.posts.forEach(function(post){
        if(post.distance < circle.radius/1609.344){
          createMarker(post);
        }
      });

    }, function(error){
      console.log("Could not get location");
    });
  };


  $scope.$on('$ionicView.enter', function(){
    $scope.drawMap(); //changed $scope to LocationFactory
  });
}])



//for future app start up page
.controller('splashPageCtrl',['$scope',function($scope) {
}]);


/*controller for loading screen
http://pathgather.github.io/please-wait/
http://ionicframework.com/docs/api/service/$ionicLoading/
*/
