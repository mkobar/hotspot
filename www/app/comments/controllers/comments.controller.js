angular.module('app')
  //in order to get the route parameters from the url (e.g, posts/{id}) we need to inject this $stateParams
  .controller('CommentsController', ['$scope', '$stateParams', 'LoadPostsFactory', 'singlePost', function($scope, $stateParams, LoadPostsFactory, singlePost) {
    $scope.post = singlePost;
    $scope.comment = {
      input: ""
    };
    $scope.addComment = function() {
      if(!$scope.comment.input) {return;}
      LoadPostsFactory.addComment(singlePost._id, $scope.comment.input)
        .then(function(comment) {
      });

      $scope.post.comments.push($scope.comment.input);
      $scope.comment.input = "";
    };
}]);
