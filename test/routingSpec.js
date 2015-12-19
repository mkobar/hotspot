describe('Routing', function(){
  var $state;
  beforeEach(module('app'));

  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
  }));

  it('Should have a main state', function(){
    expect($state.templateUrl).to.be.equal('templates/main.html');
  });

});
