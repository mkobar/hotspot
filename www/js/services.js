angular.module('app.services', [])

.factory('LoadPostsFactory', [function(){
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

.factory('CameraFactory', ['$cordovaCamera','$http', function($cordovaCamera, $http){

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

  var postPhoto = function(imgURI){
    return $http({
      method: 'POST',
      url: '/addPost',
      data: image
    });
  };

  return {
    takePhoto : takePhoto,
    postPhoto : postPhoto
  };

}]);
