angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('main', {
      url: '/main',
      abstract:true,
      templateUrl: 'templates/main.html'
    })


    .state('main.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })



    .state('main.camera', {
      url: '/camera',
      views: {
        'camera-tab': {
          templateUrl: 'templates/camera.html',
          controller: 'cameraCtrl'
        }
      }
    })



    .state('main.map', {
      url: '/map',
      views: {
        'map-tab': {
          templateUrl: 'templates/map.html',
          controller: 'mapCtrl'
        }
      }
    })




    .state('comments', {
      url: '/comments',
      templateUrl: 'templates/comments.html',
      controller: 'commentsCtrl'
    })







    .state('startUp', {
      url: '/startup',
      templateUrl: 'templates/startUp.html',
      controller: 'startUpCtrl'
    })




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main/home');

});
