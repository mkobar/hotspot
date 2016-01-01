angular.module('app.HomeController', [])

.controller('HomeController', ['$scope', 'LoadPostsFactory', '$stateParams', 'LocationFactory', '$ionicLoading', '$ionicActionSheet', function($scope, LoadPostsFactory, $stateParams, LocationFactory, $ionicLoading, $ionicActionSheet) {
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
    }

    if(sessionStorage[post._id] === undefined) {
      LoadPostsFactory.upvotePost(post._id);
      post.upvotes++;
      sessionStorage[post._id] = true;
      console.log('upvoted the sessionStorage', sessionStorage);
    }
  };

  //show trending images
  $scope.showTrending = function() {
    LoadPostsFactory.getAllPosts();
    $scope.bounds = 10000000;
  };

  $scope.report = function(post) {
    if(post.reports === 100){
      LoadPostsFactory.removePost(post._id);
    } else {
      LoadPostsFactory.reportPost(post._id);
      post.reports++;
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
