require('jasmine-node');
var Constants = require('../constants.js');
var DataModel = require('../' + Constants.jsRoot + 'viewer/DataModel.js');
var Backend = require('../' + Constants.jsRoot + 'viewer/Backend.js');


describe('Test that a data model can be created', function() {

  it('Create a data model', function() {
    var backend = new Backend();
    var dataModel = new DataModel(500, backend);
    expect(dataModel).not.toBeNull();
  });


  it("Zoom in test", function() {
    var backend = new Backend();
    var dataModel = new DataModel(5, backend);
    console.log("Default range:");
    console.log(dataModel.getVisiblePoints());

    dataModel.zoomIn();

    console.log("After zoom in:");
    console.log(dataModel.getVisiblePoints());

    /*
    for(var row = 0; row < index2.getNumberOfRows(); ++row) {
      console.log(index2.getRow(row));
    }
    */
  });

});

var jasmineEnv = jasmine.getEnv();
var htmlReporter = new jasmine.TapReporter(); // HtmlReporter();
jasmineEnv.addReporter(htmlReporter);
jasmineEnv.execute();
