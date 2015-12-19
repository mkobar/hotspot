describe('cameraCtrl', function(){
  var $scope, $rootScope, createController, $state, CameraFactory, LocationFactory, $ionicLoading, $httpBackend;

  //load the controllers module
  beforeEach(module('app'));
  beforeEach(inject(function($injector){

    //mock out dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    CameraFactory = $injector.get('CameraFactory');
    LocationFactory = $injector.get('LocationFactory');
    $ionicLoading = $injector.get('$ionicLoading');
    $scope = $rootScope.$new();
    $state = $injector.get('$state');

    var $controller = $injector.get('$controller');

    //creating a controller
    createController = function(){
      return $controller('cameraCtrl', {
        $scope: $scope,
        $state: $state,
        CameraFactory: CameraFactory,
        LocationFactory: LocationFactory,
        $ionicLoading: $ionicLoading
      });
    };
  }));

  //tests start here
  it('should have a userPost object on the $scope', function(){
    createController();
    expect($scope.userPost).to.be.an('object');
  });

});

