//import IDataModelListener = require('IDataModelListener');


/*
 Interface between UI components and data. This class
 has the following responsibilities:
 - Spread events to other models (like the column models).
 - Provide functions that calculate a summary of a range
 - of data values in a pixel.
 */
class DataModel implements IDataModel {
    public static get ZOOM_LEVEL_MAX():number {
        return 10;
    }

    public static get ZOOM_LEVEL_MIN():number {
        return 1;
    }


    private zoomLevel:number = DataModel.ZOOM_LEVEL_MIN;
    private rangesStart:number[];
    private rangesStop:number[];

    private range:number;
    private startIndex:number;
    private stopIndex:number;

    private listeners:IDataModelListener[];


    // The index needs to know the height (number of pixels)
    // available for painting in order to lay out the
    // values on the y-axis
    constructor(private height:number, private backend:IBackend) {
        this.rangesStart = new Array<number>(height);
        this.rangesStop = new Array<number>(height);

        this.range = undefined;
        this.startIndex = undefined;
        this.stopIndex = undefined;


        // this.rangeStart = backend.getRangeStart();
        console.log('Backend start: ' + backend.getRangeStart() + '. Backend end: ' + backend.getRangeEnd());
        this.setRange(backend.getRangeStart(), backend.getRangeEnd());
        console.log('Start index: ' + this.startIndex + '. Stop index: ' + this.stopIndex);

        this.scrollJump = Math.floor((this.stopIndex - this.startIndex) / 10);

        this.calculateVisiblePoints();

    }


    addListener(listener:IDataModelListener) {
        this.listeners.push(listener);
    }

    private notifyListenersRangeChanged() {
        for (var i = 0; i < this.listeners.length; ++i) {
            this.listeners[i].rangeChanged();
        }
    }

    scaleParameter(parameter:number, value:number) {
        // TODO Scale per parameter
        // TODO Check if negative values are handled correctly

        //console.log("Width2: " +this.width +". Value: " +value +". Parameter min: " +this.parameterMin +". Parameter max: " +this.parameterMax);

        return (value - this.parameterMin) / (this.parameterMax - this.parameterMin) * this.width;
    }

    // Calculates the minimum, maximum and average for the
    // parameter within the range [start, stop]. The start
    // and stop values are integers that represent a range
    // of index points
    getValue(parameter:number, start:number, stop:number) {
        return this.backend.getValue(parameter, start, stop);
    }

    getScaledValue(parameter:number, start:number, stop:number) {
        var valueSummary = this.getValue(parameter, start, stop);
        return {
            average: this.scaleParameter(parameter, valueSummary.average),
            min: this.scaleParameter(parameter, valueSummary.min),
            max: this.scaleParameter(parameter, valueSummary.max)
        };
    }

    getValuesForParameter(parameter:number) {
        var currentRange = this.getRange();

        var parameterValues = [];
        for (row = 0; row < currentRange.length; ++row) {
            // TODO Use scaled values when finished debugging
            // parameterValues.push(this.getScaledValue(parameter, currentRange[row][0], currentRange[row][1]);

            parameterValues.push(this.getValue(parameter, currentRange[row][0], currentRange[row][1]));
        }
        return parameterValues;
    }

    setDimensions(width:number, height:number) {
        this.width = width;
        this.setHeight(height);
        this.notifyListenersRangeChanged();
    }

    setRange(start:number, stop:number) {
        this.setRangeStart(start);
        this.setStop(stop);
        this.range = stop - start;
        this.notifyListenersRangeChanged();
    }

    getRangeStart() {
        return this.startIndex;
    }

    setRangeStart(startRange:number) {
        this.startIndex = startRange;
    }

    getMin():number {
        return this.backend.getMin(this.parameter);
    }

    getMax() {
        return this.backend.getMax(this.parameter);
    }

    clearRange() {
        for (var row = 0; row < this.height; ++row) {
            this.ranges[row][0] = -1;
            this.ranges[row][1] = -1;
        }
    }

    calculateVisiblePoints() {
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

    }

    getRow(row) {
        return {
            start: this.rangesStart[row],
            stop: this.rangesStop[row][1]
        }
    }

    getNumberOfRows() {
        return this.height;
    }

    getVisiblePoints() {
        return {
            start: this.startIndex,
            stop: this.stopIndex
        };
    }

    setStop(stop) {
        this.stopIndex = stop;
    }

    getHeight() {
        return this.height;
    }

    setHeight(height) {
        this.height = height;
        this.calculateVisiblePoints();
    }

    zoomIn() {
        if (this.zoomLevel < this.ZOOM_LEVEL_MAX) {
            ++this.zoomLevel;
        }
        this.updateAfterZoom();
    }

    zoomOut() {
        if (this.zoomLevel > this.ZOOM_LEVEL_MIN) {
            --this.zoomLevel;
        }
        this.updateAfterZoom();
    }

    updateAfterZoom() {
        var totalRange = this.backend.getRangeEnd() - this.backend.getRangeStart();
        this.range = totalRange / this.zoomLevel;
        this.calculateVisiblePoints();
        this.notifyListenersRangeChanged();
    }

    scrollDown() {
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
    }

    scrollUp() {
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
    }

    getIndexRange() {
        return this.range;
    }

    getRange() {
        return this.ranges;
    }


}

