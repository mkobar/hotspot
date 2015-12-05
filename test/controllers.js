
/*
  Testing block for loading posts on homeview
*/
// describe('Homepage', function(){
//   describe('', function(){
//     it('should return the sum of two numbers', function(){
//       expect(add(1,2)).toBe(3);
//     });

//     it('should be a function', function(){
//       expect(add).toEqual(jasmine.any(Object));
//     });

//   });

// });


describe('commentsCtrl', function(){
  beforeEach(module('app.controllers'));
  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  // describe('$scope.post', function() {
  //     it('should contain an indvidual post object', function() {
  //       var $scope = {};
  //       var controller = $controller('commentsCtrl', { $scope: $scope });
  //       $scope.password = 'longerthaneightchars';
  //       $scope.grade();
  //       expect($scope.post).toEqual('strong');
  //     });

  //     it('sets the strength to "weak" if the password length <3 chars', function() {
  //       var $scope = {};
  //       var controller = $controller('PasswordController', { $scope: $scope });
  //       $scope.password = 'a';
  //       $scope.grade();
  //       expect($scope.strength).toEqual('weak');
  //     });
  // });


});
