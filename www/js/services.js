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

.service('BlankService', [function(){

}]);
