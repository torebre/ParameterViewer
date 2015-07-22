  /*
          Interface between UI components and data. This class
          has the following responsibilities:
          - Spread events to other models (like the column models).
          - Provide functions that calculate a summary of a range
          - of data values in a pixel.
          */
  module.exports = (function() {
    /*
    The height is the number of pixels available in the y-direction,
    it is needed to determine how large a part of the range to put
    into a pixel.
    */
    function DataModel(height, backend) {
      var listeners = [];

      this.addListener = function(listener) {
        listeners.push(listener);
      };

      this.notifyListenersRangeChanged = function() {
        for (var i = 0; i < listeners.length; ++i) {
          listeners[i].rangeChanged();
        }
      };

      this.init(height, backend);
    }

    DataModel.prototype = {

      init: function(height, backend) {
        this.backend = backend;
        this.ZOOM_LEVEL_MAX = 10;
        this.ZOOM_LEVEL_MIN = 1;
        this.zoomLevel = this.ZOOM_LEVEL_MIN;

        // The index needs to know the height (number of pixels)
        // available for painting in order to lay out the
        // values on the y-axis
        this.height = height;
        this.ranges = new Array(height);
        for (var i = 0; i < this.ranges.length; ++i) {
          this.ranges[i] = new Array(2);
        }
        this.range = undefined;
        this.startIndex = undefined;
        this.stopIndex = undefined;
        // this.rangeStart = backend.getRangeStart();
        console.log('Backend start: ' + backend.getRangeStart() + '. Backend end: ' + backend.getRangeEnd());
        this.setRange(backend.getRangeStart(), backend.getRangeEnd());
        console.log('Start index: ' + this.startIndex + '. Stop index: ' + this.stopIndex);

        this.scrollJump = Math.floor((this.stopIndex - this.startIndex) / 10);

        this.calculateVisiblePoints();
      },

      scaleParameter: function(parameter, value) {
        // TODO Scale per parameter
        // TODO Check if negative values are handled correctly

        //console.log("Width2: " +this.width +". Value: " +value +". Parameter min: " +this.parameterMin +". Parameter max: " +this.parameterMax);

        return (value - this.parameterMin) / (this.parameterMax - this.parameterMin) * this.width;
      },

      // Calculates the minimum, maximum and average for the
      // parameter within the range [start, stop]. The start
      // and stop values are integers that represent a range
      // of index points
      getValue: function(parameter, start, stop) {
        return this.backend.getValue(parameter, start, stop);
      },

      getScaledValue: function(parameter, start, stop) {
        var valueSummary = this.getValue(parameter, start, stop);
        return {
          average: this.scaleParameter(parameter, valueSummary.average),
          min: this.scaleParameter(parameter, valueSummary.min),
          max: this.scaleParameter(parameter, valueSummary.max)
        };
      },

      getValuesForParameter: function(parameter) {
        var currentRange = this.getRange();

        var parameterValues = [];
        for (row = 0; row < currentRange.length; ++row) {
          // TODO Use scaled values when finished debugging
          // parameterValues.push(this.getScaledValue(parameter, currentRange[row][0], currentRange[row][1]);

          parameterValues.push(this.getValue(parameter, currentRange[row][0], currentRange[row][1]));
        }
        return parameterValues;
      },

      setDimensions: function(width, height) {
        this.width = width;
        this.setHeight(height);
        this.notifyListenersRangeChanged();
      },

      setRange: function(start, stop) {
        this.setRangeStart(start);
        this.setStop(stop);
        this.range = stop - start;
        this.notifyListenersRangeChanged();
      },

      getRangeStart: function() {
        return this.startIndex;
      },

      setRangeStart: function(startRange) {
        this.startIndex = startRange;
      },

      getMin: function() {
        return this.backend.getMin(this.parameter);
      },

      getMax: function() {
        return this.backend.getMax(this.parameter);
      },

      clearRange: function() {
          for (var row = 0; row < this.height; ++row) {
            this.ranges[row][0] = -1;
            this.ranges[row][1] = -1;
          }
      },

      calculateVisiblePoints: function() {
        // Integer division
        var pointsPerPixel = ~~(this.getIndexRange() / this.height);
        var remainder = this.getIndexRange() % this.height;

        console.log('Range: ' + this.getIndexRange() + '. Height: ' + this.height);
        console.log("Points per pixel: " + pointsPerPixel);

        if (pointsPerPixel == 0) {
          // Less than one datapoint per pixel
          pixelsPerIndexPoint = this.height / this.getIndexRange();

          console.log("Pixels per index point: " + pixelsPerIndexPoint);
          console.log("Height: " + this.height + ". Range: " + this.getIndexRange());

          this.clearRange();

          var end = this.getRangeStart() + this.getIndexRange();
          var currentIndex = this.getRangeStart();

          console.log('Range start: ' + currentIndex + '. End: ' + end);

          // for (var currentRow = this.getRangeStart(); currentRow <= this.height; currentRow = currentRow + pixelsPerIndexPoint) {
          for (var currentRow = 0; currentRow <= this.height; currentRow = currentRow + pixelsPerIndexPoint) {
            var flooredRow = Math.floor(currentRow);
            // console.log('Floored row: ' +flooredRow +'. Index point: ' +currentIndex);

            this.ranges[flooredRow][0] = currentIndex;
            this.ranges[flooredRow][1] = currentIndex;

            ++currentIndex;
            if (currentIndex > end) {
              console.log('This should not happen');
              break;
            }
          }
        } else {
          console.log('Range start: ' + this.startIndex);

          var currentStart = this.startIndex;
          // More than or equal to one point per pixel
          for (var row = 0; row < this.height; ++row) {

            // console.log("Writing value at row " +row +". Value: " +currentStart);

            this.ranges[row][0] = currentStart;
            currentStart += pointsPerPixel;
            this.ranges[row][1] = currentStart - 1;
          }

          // TODO Spread the remainder points

        }

      },

      getRow: function(row) {
        return {
          start: this.ranges[row][0],
          stop: this.ranges[row][1]
        };
      },

      getNumberOfRows: function() {
        return this.height;
      },

      getVisiblePoints: function() {
        return {
          start: this.startIndex,
          stop: this.stopIndex
        };
      },

      setStop: function(stop) {
        this.stopIndex = stop;
      },

      getHeight: function() {
        return this.height;
      },

      setHeight: function(height) {
        this.height = height;
        this.calculateVisiblePoints();
      },

      zoomIn: function() {
        if (this.zoomLevel < this.ZOOM_LEVEL_MAX) {
          ++this.zoomLevel;
        }
        this.updateAfterZoom();
      },

      zoomOut: function() {
        if (this.zoomLevel > this.ZOOM_LEVEL_MIN) {
          --this.zoomLevel;
        }
        this.updateAfterZoom();
      },

      updateAfterZoom: function() {
        var totalRange = this.backend.getRangeEnd() - this.backend.getRangeStart();
        this.range = totalRange / this.zoomLevel;
        this.calculateVisiblePoints();
        this.notifyListenersRangeChanged();
      },

      scrollDown: function() {
        var end = this.getRangeStart() + this.getIndexRange();

        var newStart = undefined;
        if (end + this.scrollJump > this.backend.getRangeEnd()) {
          if (this.getRangeStart() == end - this.scrollJump) {
            return;
          }
          newStart = end - this.scrollJump;
        } else {
          newStart = this.getRangeStart() + this.scrollJump;
        }
        this.setRangeStart(newStart);
        this.calculateVisiblePoints();
        this.notifyListenersRangeChanged();
      },

      scrollUp: function() {
        var start = this.getRangeStart();
        var newStart = undefined;
        if (start - this.scrollJump < this.backend.getRangeStart()) {
          if (start == this.backend.getRangeStart()) {
            return;
          }
          newStart = this.backend.getRangeStart();
        } else {
          newStart = start - this.scrollJump;
        }

        this.setRangeStart(newStart);
        this.calculateVisiblePoints();
        this.notifyListenersRangeChanged();
      },

      getIndexRange: function() {
        return this.range;
      },

      getRange: function() {
        return this.ranges;
      }

    }
    return DataModel;

  })();
