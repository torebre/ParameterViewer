var tape = require('tape');

var Constants = require('./constants.js');

var DataModel = require(Constants.jsRoot + 'viewer/DataModel.js');
var dummyData = require(Constants.jsRoot + 'viewer/dummyData.js');

// Set up an index
var index = new Index(500);
index.calculateVisiblePoints(0, 500, 500);

console.log("Visible points:");
for(var i = 0; i < index.getNumberOfRows(); ++i) {
  console.log(i +": " +index.getVisiblePoints().start[i] +", " +index.getVisiblePoints().stop[i]);
}

//console.log(dummyData.values);
var myData = new DataModel(index);
myData.setRange(0, 500);
myData.setDimensions(200, 500);


console.log(myData.getValue("Test1", 100, 200));
console.log(myData.recalculate());
