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

  return {

    getPicture: function(options) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {
           // Do any magic you need
           q.resolve(result);
         }, function(err) {
           q.reject(err);
         }, options);

         return q.promise;
       },

    takePicture: function() {
      navigator.camera.getPicture(function(imageURI) {

        // imageURI is the URL of the image that we can use for
        // an <img> element or backgroundImage.

      }, function(err) {

        // Ruh-roh, something bad happened
        alert('error: ', err);

      }, cameraOptions);
    }
  };
}]);
