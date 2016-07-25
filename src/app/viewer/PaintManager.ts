import {Backend} from "../backend/Backend";
import {Injectable} from "@angular/core";
import {IBackend} from "../backend/IBackend";
import {Observable} from "rxjs/Rx";


@Injectable()
export class PaintManager {


    constructor(private backend:Backend) {



    }




    getSvgPathForParameter(parameter:string):Observable<number[]> {
        // TODO Just here for testing
        // return "M50,50 A30,50 0 0,1 100,100";

      return this.backend.getValues(1, 1, 0, 100);
    }

    // generateFullSvgPath(coordinates:Array<ValueSummary>):string {
    //     var svgPath = "M " + this.xOffset + " " + this.yOffset;
    //     var skipRows = 0;
    //     var parameterRangeMin = this.parameterTrackModel.getMin();
    //     var parameterRangeMax = this.parameterTrackModel.getMax();
    //
    //     for (var row = 0; row < this.height; ++row) {
    //         if (coordinates[row]) {
    //             var scaledAverage = this.scaleValue(coordinates[row].average, parameterRangeMin, parameterRangeMax);
    //             // TODO Use relative path instead?
    //             svgPath += "L" + (this.xOffset + scaledAverage) + ', ' + (this.yOffset + row);
    //             skipRows = 0;
    //         } else {
    //             skipRows++;
    //         }
    //     }
    //     // console.log('SVG path: ' +svgPath);
    //     return svgPath;
    // }





}
