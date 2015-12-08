angular.module('app.services', [])

.factory('LoadPostsFactory', [
  '$http',
  function($http){
    var o = {
      posts: []
    };

    //load all posts from server
    o.getPosts = function(){
      return $http({method: 'GET',url: '/posts'})
      .success(function(response){
        console.log('getPosts() worked');
        angular.copy(response, o.posts); // (src, dest)
       });
    };


    //retrieve an individual post from database
    o.getSinglePost = function(id){
      console.log('inside getSinglePost');
      return $http({method: 'GET',url: '/posts/' + id})
      .then(function(response){
        console.log('response.data', response.data);
        return response.data;
      });
    };

    o.upvotePost = function(){
      return $http({method: 'GET',url: '/posts/' + id})
      .then(function(response){
        console.log('response.data', response.data);
        return response.data;
      });
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



.factory('LocationFactory', [
  '$cordovaGeolocation',
   function($cordovaGeolocation){

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
