require('jasmine-node');
var Constants = require('../constants.js');
var Backend = require('../' + Constants.jsRoot + 'backend/Backend.js');


describe('Tests for the dummy backend', function() {

  it('Get blocks in data range', function() {
    var backend = new Backend();
    var blockIndices = backend.getBlockIndices(0, 100);

    expect(blockIndices.prefix).toEqual(0);
    expect(blockIndices.firstBlock).toEqual(0);
    expect(blockIndices.postfix).toEqual(4);
    expect(blockIndices.lastBlock).toEqual(3);
  });

});

var jasmineEnv = jasmine.getEnv();
var htmlReporter = new jasmine.TapReporter(); // HtmlReporter();
jasmineEnv.addReporter(htmlReporter);
jasmineEnv.execute();
