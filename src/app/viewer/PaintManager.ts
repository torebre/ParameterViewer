import {Backend} from "../backend/Backend";
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/Rx";
import {ParameterUpdate} from "./ParameterUpdate";


/**
 * Provides methods for calculating the graphs.
 *
 */
@Injectable()
export class PaintManager {
  minIndexShowing:number = 0;
  maxIndexShowing:number = 0;

  height:number = 100;

  rangesStart:number[];
  rangesStop:number[];

  rangeRequest:number[] = [];

  path:number[];
  xOffset:number = 0;
  yOffset:number = 0;
  private errorMessage:any;

  maxIndex:number = 0;
  minIndex:number = 0;

  private zoomFactor:number = 0.1;
  private static zoomStep:number = 0.1;

  private parameterUpdates:Subject<ParameterUpdate>;


  constructor(private backend:Backend) {
    this.parameterUpdates = new Subject<ParameterUpdate[]>();
    this.setup();
  }


  setup() {
    // TODO Log ID just set for testing
    this.backend.getIndexRange(1).subscribe(
      indexRange => {
        this.minIndex = indexRange[0];
        this.maxIndex = indexRange[1];
        this.calculateVisiblePoints();
        this.parameterUpdates.next(new ParameterUpdate());
      },
      error => this.errorMessage = <any>error);
  }

  getSvgPathForParameter(parameter:string):Observable<number[]> {
    // TODO Just here for testing
    return this.backend.getValueSummary(1, 1, this.rangesStart, this.rangesStop);
  }

  private calculateVisiblePoints() {
    // TODO Figure out if the endpoints should be inclusive or not
    var indexRange:number = this.maxIndexShowing - this.minIndexShowing;

    // Integer division
    var pointsPerPixel:number = ~~(indexRange / this.height);
    var remainder:number = indexRange % this.height;

    console.log('Range: ' + indexRange + '. Height: ' + this.height);
    console.log("Points per pixel: " + pointsPerPixel);

    if (pointsPerPixel == 0) {
      // Less than one datapoint per pixel
      var pixelsPerIndexPoint:number = this.height / indexRange;

      console.log("Pixels per index point: " + pixelsPerIndexPoint);
      console.log("Height: " + this.height + ". Range: " + indexRange);

      // this.clearRange();
      this.rangesStart = [];
      this.rangesStop = [];
      for (var i = 0; i <= this.height; ++i) {
        this.rangesStart[i] = -1;
        this.rangesStop[i] = -1;
      }

      var end = this.maxIndexShowing;
      var currentIndex = this.minIndexShowing;

      console.log('Range start: ' + currentIndex + '. End: ' + end);

      for (var currentRow = 0; currentRow <= this.height; currentRow = currentRow + pixelsPerIndexPoint) {
        var flooredRow = Math.floor(currentRow);
        this.rangesStart[flooredRow] = currentIndex;
        this.rangesStop[flooredRow] = currentIndex;
        ++currentIndex;
        if (currentIndex > end) {
          console.log('This should not happen');
          break;
        }
      }
    } else {
      console.log('Range start: ' + this.minIndexShowing);

      var currentStart = this.minIndexShowing;
      // More than or equal to one point per pixel
      for (var row = 0; row < this.height; ++row) {

        // console.log("Writing value at row " +row +". Value: " +currentStart);

        this.rangesStart[row] = currentStart;
        currentStart += pointsPerPixel;
        // this.ranges[row][1] = currentStart - 1;

        this.rangesStop[row] = currentStart - 1;

      }

      // TODO Spread the remainder points

    }

    console.log("Ranges start: " +this.rangesStart);
  }

  visibleRangeChanged(start:number, range:number) {
    this.minIndexShowing = start;
    this.maxIndexShowing = start + range;

    console.log("Start: " + this.minIndexShowing + ". Stop: " + this.maxIndexShowing);

    this.calculateVisiblePoints();

    this.render();
  }

  render():void {
    // TODO Get from real parameter
    this.getSvgPathForParameter("Test").subscribe(
      path => {
        // console.log("Got path: " + path);

        this.path = path;
        var parameterUpdate = new ParameterUpdate();
        this.parameterUpdates.next(parameterUpdate);
      },
      error => this.errorMessage = <any>error);
  }

  getPath():number[] {
    return this.path;
  }

  getParameterUpdates():Observable<ParameterUpdate> {
    return this.parameterUpdates.asObservable();
  }

  zoomOut() {
    if(this.zoomFactor >= 1.0) {
      return;
    }
    this.zoomFactor += PaintManager.zoomStep;
    this.parameterUpdates.next(new ParameterUpdate());
  }

  zoomIn() {
    if(this.zoomFactor <= 0.1) {
      return;
    }
    this.zoomFactor -= PaintManager.zoomStep;
    this.parameterUpdates.next(new ParameterUpdate());
  }

  getZoomFactor():number {
    return this.zoomFactor;
  }

}
