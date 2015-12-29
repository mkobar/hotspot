angular.module('app')

.controller('CameraController', ['$scope', '$state', 'CameraFactory', 'LocationFactory', '$ionicLoading', function($scope, $state, CameraFactory, LocationFactory, $ionicLoading) {
  $scope.userPost = {
    upvotes: 0,
    comments: [],
    imageURI: undefined,
    caption: '',
    location: {},
    hashtag: ''
  };


  $scope.getLocation = function() {
    LocationFactory.getPosition()
      .then(function(position) {
        $scope.userPost.location.lng = position.coords.longitude;
        $scope.userPost.location.lat = position.coords.latitude;
      }, function(err) {
        console.log('There was an error: ', err);
      });
  };
  $scope.takePicture = function() {
    CameraFactory.takePhoto()
      .then(function(imageData) {
        $scope.userPost.imageURI = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // An error occured. Show a message to the user
        console.log('error', err);
        $state.go('main.home'); //this causes a home refresh, which may not be necessary
      });
  };

  $scope.$on('$ionicView.enter', function() {
    $scope.userPost.caption = "";
    $scope.userPost.imageURI = undefined;
    $scope.takePicture();
    $scope.getLocation();
  });


  $scope.addPost = function() {
    var hashtags = [];
    var postCaptionWords = $scope.userPost.caption.split(" ");
    var getHashtags = function(wordsArray) {
      for(var i = 0; i < wordsArray.length; i++) {
        if(wordsArray[i][0] === '#') {
          hashtags.push(wordsArray[i]);
          $scope.userPost.hashtag = hashtags.join(" ");
        }
      }
    };

    console.log('this is the userPost being posted', $scope.userPost);
    $ionicLoading.show({
      template: 'Posting you photo, please-wait...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    CameraFactory.postPhoto($scope.userPost)
      .success(function() {
        $state.go('main.home');
      })
      .catch(function(err) {
        console.log('There was an error: ', err);
      });
  };

}]);
