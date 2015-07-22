/*
  Draw parameter values inside a box defined by
  parameters given to the constructor.
*/
module.exports = (function() {
  function ParameterTrack(parameterTrackModel, paper, xOffset, yOffset, width2, height2) {
    this.parameterTrackModel = parameterTrackModel;
    this.parameterTrackModel.setParameterTrack(this);
    this.paper = paper;
    var xOffset = xOffset;
    this.yOffset = yOffset;
    var width = width2;
    var height = height2;
    this.colour = '#000000';
    // This represents the drawn line
    var path = undefined;
    // TODO Is it necessery to have access to both paths?
    var raphaelPath = undefined;


    function addBoundingBox() {
      var rect = paper.rect(xOffset, yOffset, width, height);
      rect.attr('stroke', this.colour);
    }

    this.getModel = function() {
      return this.parameterTrackModel;
    };

    this.setColour = function(colour) {
      this.colour = colour;
    }

    this.render = function() {
      if(raphaelPath !== undefined) {
        raphaelPath.remove();
      }
      addBoundingBox();
      var coordinates = parameterTrackModel.getParameterPath();
      path = generateFullSvgPath(coordinates);
      raphaelPath = this.paper.path(path);
      raphaelPath.attr('stroke', this.colour);
    };

    this.setWidth = function(width2) {
      width = width2;
    };

    this.setXOffset = function(xOffset2) {
      xOffset = xOffset2;
    };

    function scaleValue(value, min, max) {
      return (value - min) * width / (max - min);
    };

    function generateFullSvgPath(coordinates) {
      var svgPath = "M " + xOffset + " " + yOffset;
      var skipRows = 0;
      var parameterRange = parameterTrackModel.getRange();

      for (var row = 0; row < height; ++row) {
        if (coordinates[row]) {
          var scaledAverage = scaleValue(coordinates[row].average, parameterRange.min, parameterRange.max);
          // TODO Use relative path instead?
          svgPath += "L" + (xOffset + scaledAverage) + ', ' + (yOffset + row);
          skipRows = 0;
        } else {
          skipRows++;
        }
      }
      return svgPath;
    };
  }

  return ParameterTrack;
})();
