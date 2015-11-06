var Raphael = require('raphael');
var ParameterTrackModel = require('./ParameterTrackModel.js');
var ParameterTrack = require('./ParameterTrack.js');
var ParameterTrackHeader = require('./ParameterTrackHeader.js');
var DataModel = require('./DataModel.js');


module.exports = (function() {
  function ParameterViewer(colWidth, colHeight, backend) {
    dataModel = new DataModel(colHeight, backend);
    parameterTrackModels = [];
    parameterTracks = [];
    parameterTrackHeaders = [];
    papers = [];
    indexTrackMap = [];
    numberOfParameters = 0;

    function updateMarkerLineForAllParameterTracks(yCoord) {
      for (var i = 0; i < parameterTracks.length; ++i) {
        parameterTracks[i].getModel().updateMarkerLine(yCoord);
      }
    };

    this.removeParameter = function(parameter) {
      delete parameterTrackModels[parameter];
    }

    this.drawParameter = function(trackContainerElement, parameterName) {
      var parameterTrackModel = parameterTrackModels[parameterName];

      console.log('Model: ' + parameterTrackModel);

      if (papers[parameterName] == undefined) {
        papers[parameterName] = Raphael(trackContainerElement, colWidth, colHeight);
      }
      var paper = Raphael(trackContainerElement, colWidth, colHeight);
      // TODO Need to figure out the life cycle of the papers, and then
      // delete the old parameter tracks attached to the old papers
      parameterTracks[parameterName] = new ParameterTrack(parameterTrackModel, paper, 0, 0,
        colHeight,
        colWidth, dataModel);
      indexTrackMap[numberOfParameters] = parameterName;
      ++numberOfParameters;
      parameterTrackHeaders[parameterName] = new ParameterTrackHeader(paper, parameterTrackModel);

      render();
    };

    this.addParameterTrack = function(parameterName) {
      console.log('Adding track: ' + parameterName + '. Length: ' + parameterTrackModels.length);
      parameterTrackModels[parameterName] = new ParameterTrackModel(parameterName, dataModel);
      console.log('Length after update: ' + parameterTrackModels.length);
    };

    this.setColumnWidths = function(widths) {
      for (counter = 0; counter < numberOfParameters; ++counter) {
        var key = indexTrackMap[counter];
        parameterTracks[key].setWidth(widths[counter]);
      }
      render();
    };

    this.setColumnHeights = function(heights) {
      for (counter = 0; counter < numberOfParameters; ++counter) {
        var key = indexTrackMap[counter];
        parameterTracks[key].setHeight(heights[counter]);
      }
      render();
    };

    this.setColour = function(parameter, colour) {
      for (var i = 0; i < parameterTracks.length; ++i) {
        if (parameterTracks[i].getModel().getParameter() == parameter) {
          parameterTracks[i].setColour(colour);
          parameterTracks[i].render();
        }
      }
    };


    this.redraw = function() {
      console.log('Redrawing');
      // TODO If nothing else needs to be done, render can be made public
      render();
    };

    function updateColumnWidths() {
      // TODO For now just give all the columns the same width
      if (parameterTracks.length == 0) {
        return;
      }
      var cumulativeWidth = 0;
      var widthPerTrack = width / parameterTracks.length;
      for (var i = 0; i < parameterTracks.length; ++i) {

        console.log('Setting offset: ' + cumulativeWidth);

        parameterTracks[i].setXOffset(cumulativeWidth);
        parameterTracks[i].setWidth(widthPerTrack);


        parameterTrackHeaders[i].setDimensions(cumulativeWidth, 0, widthPerTrack, 0);
        cumulativeWidth += widthPerTrack;
      }
    };

    function render() {
      console.log('Number of parameter tracks: ' + parameterTracks.length);
      console.log('Number of parameter track models: ' + parameterTrackModels.length);

      for (var key in parameterTrackModels) {
        parameterTrackModels[key].render();
      }
    };

    this.calculateLayout = function() {
      if (parameterTracks.length == 0) {
        return 0;
      }
      var widths = new Array(parameterTracks.length);
      for (var i = 0; i < parameterTracks.length; ++i) {
        widths[i] = width / parameterTracks.length;
      }
      return widths;
    };

    this.zoomIn = function() {
      dataModel.zoomIn();
    };

    this.zoomOut = function() {
      dataModel.zoomOut();
    };

    this.scrollDown = function() {
      dataModel.scrollDown();
    };

    this.scrollUp = function() {
      dataModel.scrollUp();
    };

    // This method is watched by ParameterViewController
    this.getDisplayedParameters = function() {
      var result = [];
      for (var key in parameterTrackModels) {
        result.push(key);
      }
      return result;
    };
  };

  return ParameterViewer;
})();
