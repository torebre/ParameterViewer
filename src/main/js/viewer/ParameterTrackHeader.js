/**
Displays information about the parameter in a box
shown above the parameter curve.
**/
module.exports = (function() {

  function ParameterTrackHeader(raphaelPaper, parameterTrackModel) {

    var myXOffset;
    var myYOffset;
    var myWidth;
    var myHeight;
    var boundingBox;
    var xMargin = 20;
    var yMargin = 10;

    this.render = function() {
      if (boundingBox !== undefined) {
        boundingBox.remove();
        parameterName.remove();
      }
      boundingBox = raphaelPaper.rect(myXOffset, myYOffset, myWidth, myHeight);


      parameterName = raphaelPaper.text(myXOffset + xMargin, myYOffset + yMargin, parameterTrackModel.getParameter());
      parameterName.attr({
        "font-size": 16,
        "font-family": "Arial, Helvetica, sans-serif"
      });

    };

    this.setDimensions = function(xOffset, yOffset, width, height) {
      myXOffset = xOffset;
      myYOffset = yOffset;
      myWidth = width;
      myHeight = height;
    }

  }

  return ParameterTrackHeader;
})();
