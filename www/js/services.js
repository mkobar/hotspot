angular.module('app.services', [])


.factory('LoadPostsFactory', ['$http', 'apiEndPoint', function($http, apiEndPoint){

  var posts = [];

  //get all posts
  var getPosts = function(){
    return $http({
        method: 'GET',
        url: apiEndPoint.url + '/posts'
      })
    .then(function(response){
      console.log('getPosts() worked');

      angular.copy(response.data, posts); // (src, dest)
      console.log('posts', posts);
      console.log('all long and lats', getLongLat());
      getPosition();


     });
  };
  //get an array of location objects with latitude and longitude properties
  var getLongLat = function() {
    var arr = [];
    for(var i=0; i<posts.length; i++) {
      for(var key in posts[i]) {
        if(key === "location") {
          arr.push(posts[i][key]);
        }
      }
    }
    return arr;
  };
  //there's a slight delay in getting the current location
  var getPosition = function(){
    var options = {
      setTimeout : 10000,
      enableHighAccuracy : true
    };
    var current = $cordovaGeolocation.getCurrentPosition(options);
    current.then(function(position) {
      var currentObj = {};
      currentObj.lat = position.coords.latitude;
      currentObj.long = position.coords.longitude;
      console.log('current position here', obj);
      return obj;
    })
    // return $cordovaGeolocation.getCurrentPosition(options);
  };

  //get distance of two longitude and latitude coordinates. coords1 and coords2 are objects.
  var haversineDistance = function(coords1, coords2, isMiles) {
    var toRad = function(x) {
      return x * Math.PI / 180;
    };

    var lon1 = coords1.long;
    var lat1 = coords1.lat;
    var lon2 = coords2.long;
    var lat2 = coords2.lat;
    var R = 6371; // km
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    if(isMiles) d /= 1.60934;
    return d;
  };


  //get a single post
  var getSinglePost = function(id){
    return $http({
       method:'GET',
       url: apiEndPoint.url + '/posts/' + id
    })
    .then(function(response){
      return response.data;
    });
  };

    //add a comment from comments view
  var addComment = function(id, comment){
    console.log('args for addComment:\n id=',id, '\ncomment=', comment);
    return $http({
      method:'POST',
      url: apiEndPoint.url + '/posts/' + id + '/comments',
      data: {id: id ,comment: comment}
    })
    .then(function(response){
      console.log('response in addComment POST', response.data);
    });
  };

  var upvotePost = function(id){
    console.log('args for upvote :\n id=',id);
    return $http({
      method:'PUT',
      url: apiEndPoint.url + '/posts/' + id + '/upvote',
      data: {id: id}
    })
    .then(function(response){
      console.log('response in upvotePost PUT', response.data);
    });
  };

  return {
    addComment: addComment,
    posts: posts,
    getPosts: getPosts,
    getSinglePost: getSinglePost,
    upvotePost: upvotePost,
    getLongLat: getLongLat,
    getPosition: getPosition
  };
}])

.factory('CameraFactory', ['$cordovaCamera','$http', 'apiEndPoint', function($cordovaCamera, $http, apiEndPoint){

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
      url: apiEndPoint.url + '/addPost',
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
