angular.module('app.services', [])

.factory('LoadPostsFactory', ['$http', function($http){
  var posts = [];

    //get all posts
  var getPosts = function(){
    return $http({method: 'GET',url: '/posts'})
    .then(function(response){
      console.log('getPosts() worked');
      angular.copy(response.data, posts); // (src, dest)
     });
  };

  //get a single post
  var getSinglePost = function(id){
    return $http({
       method:'GET',
       url:'/posts/'+ id
    }).then(function(response){
      return response.data;
    });
  };

    //add a comment from comments view
  var addComment = function(id, comment){
    console.log('args for addComment:\n id=',id, '\ncomment=', comment);
    return $http({
      method:'POST',
      url:'/posts/' + id + '/comments',
      data: {id: id ,comment: comment}
    }).then(function(response){
      console.log('response in addComment POST', response.data);
    });
  };

  var upvotePost = function(id){
    console.log('args for upvote :\n id=',id);
    return $http({
      method:'PUT',
      url:'/posts/' + id + '/upvote',
      data: {id: id}
    }).then(function(response){
      console.log('response in upvotePost PUT', response.data);
    });
  };

  return {
    addComment: addComment,
    posts: posts,
    getPosts: getPosts,
    getSinglePost: getSinglePost,
    upvotePost: upvotePost
  };
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
      url: 'http://gentle-spire-1503.herokuapp.com/addPost',
      data: userPost
    });
  };

  return {
    takePhoto: takePhoto,
    postPhoto: postPhoto,
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
