angular.module('app.LoadPostsFactory', [])

.factory('LoadPostsFactory', ['$http', 'LocationFactory', 'SERVER', function($http, LocationFactory, SERVER) {
  var posts = {
    posts: []
  };
  var lastPostsId; //get the last ID of the post
  var dbPostCount;

  //get postCount for to tell infinite scroll when to stop
  var getDBPostCount = function() {
    // console.log('should only be called once!');
    return $http({
        method: 'GET',
        url: SERVER.url + '/postscount'
      })
      .then(function(response) {
        dbPostCount = response.data;
        // console.log('dbPostCount -->', dbPostCount);
      });
  };

  //Fetches posts for newsfeed
  var getPosts = function() {
    //create a closure variable...alreadyCalled...
    return $http({
        method: 'GET',
        url: SERVER.url + '/posts'
      })
      .then(function(response) {
        angular.copy(response.data, posts.posts); // (src, dest)
        computeDistance();
        lastPostsId = response.data[response.data.length - 1]._id;
        // console.log('last post -->', response.data[response.data.length - 1], 'lastPostsId', lastPostsId);
        // console.log('final result', posts);
        dbPostCount = dbPostCount - response.data.length;
        // console.log('dbPostCount initial load -->', dbPostCount);
      });
  };

  //grabs all posts
  var getAllPosts = function() {
    return $http({
      method: 'GET',
      url: SERVER.url +'/posts'
    })
    .then(function(response) {
      var arr = response.data.sort(function(a,b) {
        return b.upvotes - a.upvotes;
      });
      angular.copy(arr, posts.posts);
      console.log('good',response.data);
    });
  };


  //Fetch more posts if user hits bottom of newsfeed
  var loadMorePosts = function() {
    // console.log('lastPostsId', lastPostsId);
    return $http({
        method: 'GET',
        url: SERVER.url + '/nextposts',
        params: {
          id: lastPostsId
        }
      })
      .then(function(response) {
        posts.posts = posts.posts.concat(angular.copy(response.data));
        // console.log('calling compute distance from loadMore');
        computeDistance();
        dbPostCount = dbPostCount - response.data.length;
        // console.log('dbPostCount after load more -->', dbPostCount);
        lastPostsId = posts.posts[posts.posts.length - 1]._id;
        // console.log('new last post', lastPostsId);
        // console.log('posts inside service ---------------', posts);
        return {
          posts: posts,
          postsLeft: dbPostCount
        };
      });
  };



  //get an array of location objects with latitude and longitude properties
  var getLongLat = function(posts) {
    var coordinates = [];
    posts.forEach(function(post) {
      coordinates.push(post.location);
    });
    // console.log('coordinates array====', coordinates);
    return coordinates; //array of objects {lat: 37.481674, lng: -122.155591}
  };

  var computeDistance = function() {
    // console.log('in compute distance');
    var LongLatArray = getLongLat(posts.posts); // new array

    LocationFactory.getCurrentPosition()
      .then(function(coordinates) {
        // console.log('what is coordinates', coordinates)
        var currentObj = {};
        currentObj.lat = coordinates.latitude;
        currentObj.lng = coordinates.longitude;

        //on each array of coordinates..
        LongLatArray.forEach(function(post, i) {
          var distance = haversineDistance(currentObj, post, true);
          posts.posts[i].distance = distance;
        });
        // console.log('inside LoadPostsFactory -- posts', posts);
      });
  };


  //get distance of two longitude and latitude coordinates. coords1 and coords2 are objects.
  var haversineDistance = function(coords1, coords2, isMiles) {
    var toRad = function(x) {
      return x * Math.PI / 180;
    };

    var lon1 = coords1.lng;
    var lat1 = coords1.lat;
    var lon2 = coords2.lng;
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


  //Fetch a single post - used when click on comments for a post
  var getSinglePost = function(id) {
    return $http({
        method: 'GET',
        url: SERVER.url + '/posts/' + id
      })
      .then(function(response) {
        return response.data;
      });
  };

  var upvotePost = function(id) {
    return $http({
        method: 'PUT',
        url: SERVER.url + '/posts/' + id + '/upvote',
        data: {
          id: id
        }
      })
      .then(function(response) {
        console.log('response in upvotePost PUT', response.data);
      });
  };

 var downvotePost = function(id) {
    return $http({
      method: 'PUT',
      url: SERVER.url + '/posts/' + id + '/downvote',
      data: {
        id: id
      }
    })
    .then(function(response) {
       // console.log('response in downvotePost', response.data);
     });
  };

  var reportPost = function(id) {
    return $http({
      method: 'PUT',
      url: SERVER.url + '/posts/' + id + '/report',
      data: {
        id: id
      }
    });
  };

  var removePost = function(id) {
    return $http({
      method: 'DELETE',
      url: SERVER.url + '/posts/' + id + '/removePost',
      // params: {
      //   id: id
      // }
    })
      .then(function(response){
        console.log('this is the response object: ', response);
      }, function(error){
        console.log('There was an error', error);
      });
  };

  return {
    posts: posts,
    getDBPostCount: getDBPostCount,
    getPosts: getPosts,
    getSinglePost: getSinglePost,
    loadMorePosts: loadMorePosts,
    upvotePost: upvotePost,
    getLongLat: getLongLat,
    computeDistance: computeDistance,
    downvotePost: downvotePost,
    getAllPosts: getAllPosts,
    removePost: removePost,
    reportPost: reportPost
  };
}]);
