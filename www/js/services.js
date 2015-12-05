angular.module('app.services', [])

.factory('LoadPostsFactory', [function(){
  "use strict";
  var service = {
    posts: [
      {
        caption: "Going to the beach where I belong #Cali",
        imageURL: "http://www.freelargeimages.com/wp-content/uploads/2015/07/Beach_Wallpaper_02.jpg",
        upvotes: 10,
        location: '',
        comments:["What beach is that?", "second comment"]
      },
      {
        caption: "Relaxing at the park #park",
        imageURL: "http://www.surrey.ca/images/cos-master/pageImages/HawthornePark.jpg",
        upvotes: 4,
        location: '',
        comments:["Park  is awesome", "nice green day"]
      }
    ]
  };

  return service;
}])

.factory('CameraFactory', ['$cordovaCamera','$cordovaGeolocation','$http', function($cordovaCamera, $cordovaGeolocation, $http){

  var takePhoto = function (){
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      //setting source type to 'Camera.PictureSourceType.CAMERA' uses the devices native camera
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    return $cordovaCamera.getPicture(options);
  };

  var getPosition = function(){
    var options = {
      setTimeout : 10000,
      enableHighAccuracy : true
    };

    return $cordovaGeolocation.getCurrentPosition(options);
  };

  var postPhoto = function(userPost){
    return $http({
      method: 'POST',
      url: '/addPost',
      data: userPost
    });
    // .then(function(resp){
    //   console.log('this is the response from you request: ', resp);
    // });
  };

  return {
    takePhoto : takePhoto,
    postPhoto : postPhoto,
    getPosition : getPosition
  };

}]);
