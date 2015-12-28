angular.module('app')

.controller('MapController', ['$scope', '$ionicLoading', 'LocationFactory', 'LoadPostsFactory', function($scope, $ionicLoading, LocationFactory, LoadPostsFactory) {
  var posts = LoadPostsFactory.posts;
  console.log('posts??????????', $scope.posts);
  $scope.radius = {
    min: "1209.34",
    max: "40467.2",
    value: "20233.6"
  };

  // shows the loading bar
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  function createGoogleMap() {
    console.log('locFac', LocationFactory);
    LocationFactory.getCurrentPosition()
      .then(function(coordinates) {
        $ionicLoading.hide();
        var myLatLng = {
          lat: coordinates.latitude,
          lng: coordinates.longitude
        };

        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          disableDoubleClickZoom: false,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var circleRadius = {
          min: "1209.34",
          max: "40467.2",
          value: "20233.6"
        }; // min : "1609.34", max : "80467.2", value: "40233.6"


        var circle = new google.maps.Circle({
          strokeColor: 'red',
          strokeWeight: 2,
          fillColor: 'red',
          fillOpacity: 0.35,
          map: map, //changed map -$scope
          center: myLatLng,
          radius: parseInt(circleRadius.value, 10), // THIS IS IN METERS radius.value - $scope {min: "1209.34", max: "40467.2", value: "20233.6"}
          draggable: true
        });

        //modifies circle radius whenever user interacts with range bar
        google.maps.event.addDomListener(document.getElementById("radius"), 'click', function() {
          // alert('clicked!');
          var rad = parseInt($scope.radius.value, 10); //radius.value - $scope
          circle.setRadius(rad);

          //removes markers from map
          $scope.markers.forEach(function(marker) {
            marker.setMap(null);
          });

          $scope.markers = [];

          //adds new markers based on circle radius
          posts.posts.forEach(function(post) {
            if(post.distance < circle.radius / 1609.344) {
              createMarker(post);
            }
          });
        });



        ////////////////////////////////////// Map Markers //////////////////////////////////////////////////


        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function(post) {
          var marker = new google.maps.Marker({
            position: post.location,
            map: map,
            animation: google.maps.Animation.DROP,
            title: post.caption
          });
          marker.content = '<img src=' + post.imageURI + '>';
          marker.addListener('click', function() {
            console.log('clicked??????????????????');
            infoWindow.setContent('<center><h2>' + marker.title + '</h2>' + marker.content + '</center>');
            infoWindow.open(map, marker);
          });
          $scope.markers.push(marker);
        };

        posts.posts.forEach(function(post) {
          if(post.distance < circle.radius / 1609.344) {
            createMarker(post);
          }
        });
      });
  }

  $scope.$on('$ionicView.enter', function() {
    createGoogleMap();
  });
}]);
