angular.module('app.services', [])

.factory('LoadPostsFactory', [
  '$http',
  function($http){
    var o = {
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

    //load all posts from server
    o.getPosts = function(){
      console.log('inside get Posts');
      return  function(){
        console.log(123);
        angular.copy([{caption:"hello"}], o.posts); // (src, dest)
      };
      // $http.get('/posts')
      // .success(function(data){
      //   angular.copy(data, o.posts); // (src, dest)
      // });




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
  };

}])

.factory('LocationFactory', ['$cordovaGeolocation', function($cordovaGeolocation){

  var getPosition = function(){
    var options = {
      setTimeout : 10000,
      enableHighAccuracy : true
    };

    return $cordovaGeolocation.getCurrentPosition(options);
  };


  return {
    getPosition : getPosition
  };

}]);

function add(a,b){
  return a + c;
}
