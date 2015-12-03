angular.module('app.services', [])

.factory('UserPosts', [function(){
  var o = {
    posts: [
      {
        image: "http://www.freelargeimages.com/wp-content/uploads/2015/07/Beach_Wallpaper_02.jpg",
        upvotes: 10,
        comments:"going to the beach #summer",
      },
      {
        image: "http://www.surrey.ca/images/cos-master/pageImages/HawthornePark.jpg",
        upvotes: 5,
        comments:"going to the park #california",
      }
    ]
  };

  return o;
}])

.factory('Camera', ['$cordovaCamera', function($cordovaCamera){

  var imgURI;

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

    $cordovaCamera.getPicture(options)
      .then(function (imageData) {
        imgURI = "data:image/jpeg;base64," + imageData;
          }, function (err) {
            // An error occured. Show a message to the user
            console.log('error', err);
      });
  };

  return {
    takePhoto : takePhoto,
    imgURI : imgURI
  };

}]);
