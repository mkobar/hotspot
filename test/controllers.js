describe('homeCtrl', function(){
  var $scope, $rootScope, createController, LoadPostsFactory, $stateParams, LocationFactory, $ionicLoading, $httpBackend;

  beforeEach(module('app'));
  beforeEach(inject(function($injector){

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    LoadPostsFactory = $injector.get('LoadPostsFactory');
    $stateParams = $injector.get('$stateParams');
    LocationFactory = $injector.get('LocationFactory');
    $ionicLoading = $injector.get('$ionicLoading');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('homeCtrl', {
        $scope: $scope,
        $stateParams: $stateParams,
        LoadPostsFactory: LoadPostsFactory,
        LocationFactory: LocationFactory,
        $ionicLoading: $ionicLoading
      });
    };
  }));

  it('should have a posts array on the $scope', function(){
    createController();
    expect($scope.posts).to.be.an('array');
  });


});











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

  it('should have a takePicture method on the $scope', function(){
    createController();
    expect($scope.takePicture).to.be.a('function');
  });

  it('should have a getLocation method on the $scope', function(){
    createController();
    expect($scope.getLocation).to.be.a('function');
  });

  it('should have an addPost method on the $scope', function(){
    createController();
    expect($scope.addPost).to.be.a('function');
  });

});



