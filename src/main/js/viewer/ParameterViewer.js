var Raphael = require('raphael');
var ParameterTrackModel = require('./ParameterTrackModel.js');
var ParameterTrack = require('./ParameterTrack.js');
var ParameterTrackHeader = require('./ParameterTrackHeader.js');
var DataModel = require('./DataModel.js');


module.exports = (function() {
  function ParameterViewer(width, height, parameterViewName, backend) {
    // parameterView = document.getElementById(parameterViewName);
    // this.height = this.parameterView.offsetHeight;
    // this.width = this.parameterView.offsetWidth;
    // console.log('Parameter view: ' +this.parameterView.offsetWidth +', ' +this.parameterView.offsetHeight)

    headerHeight = 50;
    dataModel = new DataModel(height, backend);
    parameterTrackModels = [];
    parameterTracks = [];
    parameterTrackHeaders = [];

    papers = [];

    // this.paper = Raphael(this.parameterView, this.width, this.height);

    parameterView.onmousemove = function(event) {
      if (event.offsetY < headerHeight) {
        return;
      }
      updateMarkerLineForAllParameterTracks(event.offsetY);
    };

    parameterView.onmouseleave = function(event) {
      updateMarkerLineForAllParameterTracks(-1);
    }

    function updateMarkerLineForAllParameterTracks(yCoord) {
      for (var i = 0; i < parameterTracks.length; ++i) {
        parameterTracks[i].getModel().updateMarkerLine(yCoord);
      }
    };

    this.createPaper = function() {
    parameterView = document.getElementById(parameterViewName);

    this.paper = Raphael(this.parameterView, this.width, this.height);
    };

    this.addParameterTrack = function(parameter, parameterViewName) {

      console.log('Adding track for: ' + parameter);

      if (papers.parameterViewName == undefined) {
        // var width = this.parameterTracks[parameterTracks.length - 1].getWidth();
        papers.parameterViewName = Raphael(parameterView, width, height);
      }

      var paper = papers.parameterViewName;
      var parameterTrackModel = new ParameterTrackModel(parameter, dataModel);
      parameterTrackModels.push(
        parameterTrackModel
      );

      // TODO Height and width need to be less to make room for other components
      parameterTracks.push(new ParameterTrack(parameterTrackModel, paper, 0, headerHeight,
        height - headerHeight,
        width, dataModel));

      var parameterTrackHeader = new ParameterTrackHeader(paper, parameterTrackModel);
      parameterTrackHeaders.push(parameterTrackHeader);

      updateColumnWidths();

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

        parameterTrackHeaders[i].setDimensions(cumulativeWidth, 0, widthPerTrack, headerHeight);
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
