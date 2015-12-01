angular.module('app.controllers', [])

.controller('homeCtrl', [
  '$scope',
  'UserPosts',
  function($scope, UserPosts) {
    $scope.posts = UserPosts.posts;
}])


.controller('cameraCtrl', [
  '$scope',
  function($scope) {
	$scope.takePicture = function(){
		navigator.camera.getPicture(function(imageURL){
		}, function(err){
			console.log("error: ", err);
		}, cameraOptions);
	};
}])

.controller('commentsCtrl',[
  '$scope',
   function($scope) {

}])

.controller('mapCtrl',[
  '$scope',
   function($scope) {

}])

//for future start up page
.controller('startUpCtrl',[
  '$scope',
   function($scope) {

}]);
