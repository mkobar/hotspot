angular.module('app.services', [])

.factory('CameraFunction', ['$q', function($q){
	return {
		getPicture: function(options){
			var q = $q.defer();

			navigation.camera.getPicture(function(result){
				q.resolve(result);
			}, function(err){
				q.reject(err);
			}, options);
			return q.promise;
			}
	};
}])

.service('BlankService', [function(){

}]);

