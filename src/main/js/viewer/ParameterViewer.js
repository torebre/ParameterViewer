var Raphael = require('raphael');
var ParameterTrackModel = require('./ParameterTrackModel.js');
var ParameterTrack = require('./ParameterTrack.js');
var ParameterTrackHeader = require('./ParameterTrackHeader.js');
var DataModel = require('./DataModel.js');


module.exports = (function() {
  function ParameterViewer(width, height, parameterViewName, backend) {
    this.init(height, width, parameterViewName, backend);
  }

  ParameterViewer.prototype = {
    init: function(width, height, parameterViewName, backend) {
      this.parameterView = document.getElementById(parameterViewName);
      // this.height = this.parameterView.offsetHeight;
      // this.width = this.parameterView.offsetWidth;

      this.height = height;
      this.width = width;

      // console.log("Height: " +this.height);

      this.headerHeight = 50;
      this.backend = backend;
      this.dataModel = new DataModel(height, backend);
      this.parameterTrackModels = [];
      this.parameterTracks = [];
      this.parameterTrackHeaders = [];
      this.paper = Raphael(this.parameterView, this.width, this.height);

      // TODO Is there a better way to make the callback in the event handler
      // have access to the method that updates the line?
      this.setupMarkerLine(this.parameterView, this.headerHeight, this);
    },

    setupMarkerLine: function(parameterView, headerHeight, parameterViewer) {
      parameterView.onmousemove = function(event) {
        if(event.offsetY < headerHeight) {
          return;
        }
        parameterViewer.updateMarkerLineForAllParameterTracks(event.offsetY);
      };
      parameterView.onmouseleave = function(event) {
        parameterViewer.updateMarkerLineForAllParameterTracks(-1);
      }
    },

    updateMarkerLineForAllParameterTracks: function(yCoord) {
      for (var i = 0; i < this.parameterTracks.length; ++i) {
        this.parameterTracks[i].getModel().updateMarkerLine(yCoord);
      }
    },

    addParameterTrack: function(parameter) {

      console.log('Adding track for: ' +parameter);

      var parameterTrackModel = new ParameterTrackModel(parameter, this.dataModel);
      this.parameterTrackModels.push(parameterTrackModel);

      // TODO Height and width need to be less to make room for other components
      this.parameterTracks.push(new ParameterTrack(parameterTrackModel, this.paper, 0, this.headerHeight,
        this.height - this.headerHeight,
        this.width, this.dataModel));

      var parameterTrackHeader = new ParameterTrackHeader(this.paper, parameterTrackModel);
      this.parameterTrackHeaders.push(parameterTrackHeader);

      this.updateColumnWidths();
      this.render();
    },

    setColour: function(parameter, colour) {
      for (var i = 0; i < this.parameterTracks.length; ++i) {
        if (this.parameterTracks[i].getModel().getParameter() == parameter) {
          this.parameterTracks[i].setColour(colour);
          this.parameterTracks[i].render();
        }
      }
    },

    updateColumnWidths: function() {
      // TODO For now just give all the columns the same width
      if (this.parameterTracks.length == 0) {
        return;
      }
      var cumulativeWidth = 0;
      var widthPerTrack = this.width / this.parameterTracks.length;
      for (var i = 0; i < this.parameterTracks.length; ++i) {

        console.log('Setting offset: ' + cumulativeWidth);

        this.parameterTracks[i].setXOffset(cumulativeWidth);
        this.parameterTracks[i].setWidth(widthPerTrack);

        console.log('Parameter track headers: ' + this.parameterTrackHeaders[i]);

        this.parameterTrackHeaders[i].setDimensions(cumulativeWidth, 0, widthPerTrack, this.headerHeight);
        cumulativeWidth += widthPerTrack;
      }
    },

    render: function() {
      // this.paper.clear();
      for (var i = 0; i < this.parameterTracks.length; ++i) {
        this.parameterTracks[i].render();
        this.parameterTrackHeaders[i].render();
      }
    },

    calculateLayout: function() {
      if (this.parameterTracks.length == 0) {
        return 0;
      }
      var widths = new Array(this.parameterTracks.length);
      for (var i = 0; i < this.parameterTracks.length; ++i) {
        widths[i] = this.width / this.parameterTracks.length;
      }
      return widths;
    },

    zoomIn: function() {
      this.dataModel.zoomIn();
    },

    zoomOut: function() {
      this.dataModel.zoomOut();
    },

    scrollDown: function() {
      this.dataModel.scrollDown();
    },

    scrollUp: function() {
      this.dataModel.scrollUp();
    }

  }

  return ParameterViewer;
})();
