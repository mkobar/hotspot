angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('main.home', {
      url: '/home',
      views: {
        'tab2': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
        
      
    
      
        
    .state('comments', {
      url: '/comments',
      templateUrl: 'templates/comments.html',
      controller: 'commentsCtrl'
    })
        
      
    
      
    .state('main', {
      url: '/main',
      abstract:true,
      templateUrl: 'templates/main.html'
    })
      
    
      
        
    .state('main.camera', {
      url: '/camera',
      views: {
        'tab1': {
          templateUrl: 'templates/camera.html',
          controller: 'cameraCtrl'
        }
      }
    })
        
      
    
      
        
    .state('main.map', {
      url: '/map',
      views: {
        'tab4': {
          templateUrl: 'templates/map.html',
          controller: 'mapCtrl'
        }
      }
    })
        
      
    
      
        
    .state('startUp', {
      url: '/startup',
      templateUrl: 'templates/startUp.html',
      controller: 'startUpCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main/home');

});