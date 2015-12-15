angular.module('app.controllers', [])


.controller('homeCtrl', ['$scope','LoadPostsFactory','$stateParams', 'LocationFactory',
  function($scope, LoadPostsFactory,$stateParams, LocationFactory) {
    $scope.posts = LoadPostsFactory.posts;
    console.log('$scope.posts after factory loaded', $scope.posts);
    $scope.post = LoadPostsFactory.posts[$stateParams.id];
    $scope.bounds = parseInt(LocationFactory.getRadius().value,10);


    $scope.upvotePost = function(post){
      // console.log('in upvotePost ');
      // console.log('post._id', post._id);
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
    location: {},
    hashtag:''
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
    CameraFactory.postPhoto($scope.userPost)
      .then(function(){
        // console.log('posted! redirecting you now.');
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

  $scope.radius = LocationFactory.getRadius();

  //shows the loading bar
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $scope.$on('$ionicView.enter', function(){
    LocationFactory.getLocation(); //changed $scope to LocationFactory
    console.log('success');
  });
}])



//for future app start up page
.controller('splashPageCtrl',['$scope',function($scope) {
}]);


/*controller for loading screen
http://pathgather.github.io/please-wait/
http://ionicframework.com/docs/api/service/$ionicLoading/
*/
