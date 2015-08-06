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

    // parameterView.onmousemove = function(event) {
    //   if (event.offsetY < headerHeight) {
    //     return;
    //   }
    //   updateMarkerLineForAllParameterTracks(event.offsetY);
    // };
    //
    // parameterView.onmouseleave = function(event) {
    //   updateMarkerLineForAllParameterTracks(-1);
    // }

    function updateMarkerLineForAllParameterTracks(yCoord) {
      for (var i = 0; i < parameterTracks.length; ++i) {
        parameterTracks[i].getModel().updateMarkerLine(yCoord);
      }
    };

    this.removeParameter = function(parameter) {
      // TODO Remove from viewer
      for(var i = 0; i < parameterTrackModels.length; ++i) {
        if(parameterTrackModels[i].getParameter() == parameterName) {
          parameterTrackModel = parameterTrackModels[i];
          break;
        }
      }
    }

    this.drawParameter = function(trackContainerElement, parameterName) {
      var parameterTrackModel = parameterTrackModels[parameterName];
      for(var i = 0; i < parameterTrackModels.length; ++i) {
        if(parameterTrackModels[i].getParameter() == parameterName) {
          parameterTrackModel = parameterTrackModels[i];
          break;
        }
      }

      if (papers[parameterName] == undefined) {
        papers[parameterName] = Raphael(trackContainerElement, colWidth, colHeight);
      }
      var paper = Raphael(trackContainerElement, colWidth, colHeight);
      // TODO Need to figure out the life cycle of the papers, and then
      // delete the old parameter tracks attached to the old papers
      parameterTracks.push(new ParameterTrack(parameterTrackModel, paper, 0, 0,
        colHeight,
        colWidth, dataModel));

      var parameterTrackHeader = new ParameterTrackHeader(paper, parameterTrackModel);
      parameterTrackHeaders.push(parameterTrackHeader);

      render();
    };

    this.addParameterTrack = function(parameter) {
      // TODO Use a map instead
      var parameterTrackModel = new ParameterTrackModel(parameter, dataModel);
      parameterTrackModels.push(
        parameterTrackModel
      );
    };

    this.setColour = function(parameter, colour) {
      for (var i = 0; i < parameterTracks.length; ++i) {
        if (parameterTracks[i].getModel().getParameter() == parameter) {
          parameterTracks[i].setColour(colour);
          parameterTracks[i].render();
        }
      }
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

        console.log('Parameter track headers: ' + parameterTrackHeaders[i]);

        parameterTrackHeaders[i].setDimensions(cumulativeWidth, 0, widthPerTrack, 0);
        cumulativeWidth += widthPerTrack;
      }
    };

    function render() {
      // this.paper.clear();
      for (var i = 0; i < parameterTracks.length; ++i) {
        parameterTracks[i].render();
        parameterTrackHeaders[i].render();
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

    this.getDisplayedParameters = function() {
      var result = [];
      for (var i = 0; i < parameterTrackModels.length; ++i) {
        result.push(parameterTrackModels[i].getParameter());
      }
      return result;
    };
  };

  return ParameterViewer;
})();
