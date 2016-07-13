var tape = require('tape');

var Constants = require('./constants.js');
var graphs = require(Constants.jsRoot +'viewer/graphColumn.js');
var Index = require(Constants.jsRoot + 'viewer/index.js');
var DataModel = require(Constants.jsRoot + 'viewer/dataModel.js');
//var Raphael = require('raphael');
//var paper = Raphael(100, 100, 200, 500);

// Set up an index
var index = new Index(500);
index.calculateVisiblePoints(0, 500, 500);

//console.log(dummyData.values);
var myData = new DataModel(index);
myData.setRange(0, 500);
myData.setDimensions(200, 500);

var paper = {
  // Empty

}

var graphColumn = new GraphColumn(paper, 0, 0, 200, 500, myData);

console.log(graphColumn.calculatePath());
