angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
.controller('commentsCtrl', function($scope) {

})
      
.controller('cameraCtrl', function($scope) {
	$scope.takePicture = function(){
		navigator.camera.getPicture(function(imageURL){
		}, function(err){
			console.log("error: ", err);
		}, cameraOptions);
	};
})
   
.controller('mapCtrl', function($scope) {

})
   
.controller('startUpCtrl', function($scope) {

});
 