var Raphael = require('raphael');
var MiniView = require('./MiniView.js');

drawMiniView = function() {
  var paper = Raphael(100, 100, 200, 500);
  paper.circle(100, 100, 20, 20);

var width = 1000;

var miniView = new MiniView(paper);


}
