/*
 Interface between UI components and data. This class
 has the following responsibilities:
 - Spread events to other models (like the column models).
 - Provide functions that calculate a summary of a range
 - of data values in a pixel.
 */
import IBackend = Backend.IBackend;

class DataModel {
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
    private scrollJump:number;

    private listeners:IDataModelListener[];

    private width:number;


    // The index needs to know the height (number of pixels)
    // available for painting in order to lay out the
    // values on the y-axis
    constructor(private height:number, private backend:IBackend) {
        this.rangesStart = new Array<number>(height);
        this.rangesStop = new Array<number>(height);

        this.range = undefined;
        this.startIndex = undefined;
        this.stopIndex = undefined;

        console.log('Backend start: ' + backend.getRangeStart() + '. Backend end: ' + backend.getRangeEnd());
        this.setRange(backend.getRangeStart(), backend.getRangeEnd());
        console.log('Start index: ' + this.startIndex + '. Stop index: ' + this.stopIndex);

        this.scrollJump = Math.floor((this.stopIndex - this.startIndex) / 10);
        this.calculateVisiblePoints();
    }


    addListener(listener:IDataModelListener):void {
        this.listeners.push(listener);
    }

    private notifyListenersRangeChanged():void {
        for (var i = 0; i < this.listeners.length; ++i) {
            this.listeners[i].rangeChanged();
        }
    }

    scaleParameter(parameter:number, value:number):number {
        // TODO Scale per parameter
        // TODO Check if negative values are handled correctly

        //console.log("Width2: " +this.width +". Value: " +value +". Parameter min: " +this.parameterMin +". Parameter max: " +this.parameterMax);

        return (value - this.getMin(parameter)) / (this.getMax(parameter) - this.getMin(parameter)) * this.width;
    }

    // Calculates the minimum, maximum and average for the
    // parameter within the range [start, stop]. The start
    // and stop values are integers that represent a range
    // of index points
    getValue(parameter:number, start:number, stop:number):ValueSummary {
        return this.backend.getValue(parameter, start, stop);
    }

    getScaledValue(parameter:number, start:number, stop:number):ValueSummary {
        var valueSummary = this.getValue(parameter, start, stop);
        return new ValueSummary(
            this.scaleParameter(parameter, valueSummary.min),
            this.scaleParameter(parameter, valueSummary.max),
            this.scaleParameter(parameter, valueSummary.average)
        );
    }

    getValuesForParameter(parameter:number):Array<ValueSummary> {
        var currentRange = this.getRange();

        var parameterValues:Array<ValueSummary> = [];
        // TODO Figure out what let does
        for (let row = 0; row < currentRange.length; ++row) {
            // TODO Use scaled values when finished debugging
            // parameterValues.push(this.getScaledValue(parameter, currentRange[row][0], currentRange[row][1]);

            parameterValues.push(this.getValue(parameter, currentRange[row][0], currentRange[row][1]));
        }
        return parameterValues;
    }

    setDimensions(width:number, height:number):void {
        this.width = width;
        this.setHeight(height);
        this.notifyListenersRangeChanged();
    }

    setRange(start:number, stop:number):void {
        this.setRangeStart(start);
        this.setStop(stop);
        this.range = stop - start;
        this.notifyListenersRangeChanged();
    }

    getRangeStart():number {
        return this.startIndex;
    }

    setRangeStart(startRange:number):void {
        this.startIndex = startRange;
    }

    getMin(parameter:number):number {
        return this.backend.getMin(parameter);
    }

    getMax(parameter:number):number {
        return this.backend.getMax(parameter);
    }

    clearRange():void {
        for (var row = 0; row < this.height; ++row) {
            this.rangesStart[row] = -1;
            this.rangesStop[row] = -1;
        }
    }

    calculateVisiblePoints():void {
        // Integer division
        var pointsPerPixel = ~~(this.getIndexRange() / this.height);
        var remainder = this.getIndexRange() % this.height;

        console.log('Range: ' + this.getIndexRange() + '. Height: ' + this.height);
        console.log("Points per pixel: " + pointsPerPixel);

        if (pointsPerPixel == 0) {
            // Less than one datapoint per pixel
            var pixelsPerIndexPoint = this.height / this.getIndexRange();

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

                this.rangesStart[flooredRow] = currentIndex;
                this.rangesStop[flooredRow] = currentIndex;

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
                this.rangesStart[row] = currentStart;
                this.rangesStop[row] = currentStart - 1;
            }

            // TODO Spread the remainder points

        }

    }

    getRow(row:number):RowRange {
        return new RowRange(this.rangesStart[row], this.rangesStop[row]);
    }

    getNumberOfRows():number {
        return this.height;
    }

    getVisiblePoints():Array<number> {
        return [this.startIndex, this.stopIndex];
    }

    setStop(stop:number):void {
        this.stopIndex = stop;
    }

    getHeight():number {
        return this.height;
    }

    setHeight(height:number):void {
        this.height = height;
        this.calculateVisiblePoints();
    }

    zoomIn():void {
        if (this.zoomLevel < DataModel.ZOOM_LEVEL_MAX) {
            ++this.zoomLevel;
        }
        this.updateAfterZoom();
    }

    zoomOut() {
        if (this.zoomLevel > DataModel.ZOOM_LEVEL_MIN) {
            --this.zoomLevel;
        }
        this.updateAfterZoom();
    }

    updateAfterZoom():void {
        var totalRange = this.backend.getRangeEnd() - this.backend.getRangeStart();
        this.range = totalRange / this.zoomLevel;
        this.calculateVisiblePoints();
        this.notifyListenersRangeChanged();
    }

    scrollDown():void {
        var end = this.getRangeStart() + this.getIndexRange();

        var newStart:number = undefined;
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

    scrollUp():void {
        var start = this.getRangeStart();
        var newStart:number = undefined;
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

