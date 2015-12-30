angular.module('app')

.controller('HomeController', ['$scope', 'LoadPostsFactory', '$stateParams', 'LocationFactory', '$ionicLoading', function($scope, LoadPostsFactory, $stateParams, LocationFactory, $ionicLoading) {
  $scope.posts = LoadPostsFactory.posts;

  $scope.$on('$ionicView.enter', function() {
    $ionicLoading.hide();
    $scope.bounds = parseInt(LocationFactory.radius.value, 10) / 1609.344;
    // console.log('scope.bounds -->', $scope.bounds);
  });

  $scope.upvotePost = function(post) {
    if(sessionStorage[post._id] !== undefined) {
      LoadPostsFactory.downvotePost(post._id);
      post.upvotes--;
      delete sessionStorage[post._id];
      return;
      console.log('deleted sessionStorage id', sessionStorage[post._id]);
    }

    if(sessionStorage[post._id] === undefined) {
      LoadPostsFactory.upvotePost(post._id);
      post.upvotes++;
      sessionStorage[post._id] = true;
      console.log('upvoted the sessionStorage', sessionStorage);      
    }
    
  };

  //pull to refresh
  $scope.doRefresh = function() {
    LoadPostsFactory.getPosts().then(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };


  $scope.moreDataCanBeLoaded = true;
  $scope.loadMorePosts = function() {
    // console.log('calling loadMorePosts----------');
    LoadPostsFactory.loadMorePosts().then(function(response) {
      // console.log('response from loaf more', response);
      $scope.posts = response.posts;
      $scope.moreDataCanBeLoaded = response.postsLeft;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
}]);
