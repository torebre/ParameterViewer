// require('jasmine-node');
// var Constants = require('../constants.js');
// var DataModel = require('../' + Constants.jsRoot + 'viewer/DataModel.js');
// var Backend = require('../' + Constants.jsRoot + 'viewer/Backend.js');


describe('logViewerController', function(){

  beforeEach(module('logViewerController'));

  it('create parameter list with 3 parameters', inject(function($controller) {
    var scope = {},
        ctrl = $controller('ParameterListCtrl', {$scope:scope});

    expect(scope.parameters.length).toBe(2);
  }));

});
