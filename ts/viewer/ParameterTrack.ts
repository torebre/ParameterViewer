/*
 Draw parameter values inside a box defined by
 parameters given to the constructor.
 */
import {Component, Input, Inject, ElementRef} from "angular2/core";
import {IParameterTrackModel} from "../backend/IParameterTrackModel";
import {NgFor} from "angular2/common";
import {PaintManager} from "./PaintManager";




@Component({
    selector: "parameter-track",
    template: `
        <svg [viewBox]="viewBox"
         [width]="width"
        preserveAspectRatio="xMidYMid meet">
        <g style="stroke:#660000;">
        <path [attr.d]="getPath()"/>
        </g>
        </svg>
    `
})
export class ParameterTrack implements ParameterTrackModelListener {
    private colour:string = '#000000';

    width:string = "5cm";

    viewBox:string = "0 0 100 500";


    // @Inject(ElementRef) private elementRef:ElementRef;

    // TODO Figure out exactly what the Input-annotation does
    @Input() parameter:string;


    constructor(@Inject(PaintManager) private paintManager:PaintManager) {
        
        console.log("Paint manager: " +paintManager);


    }


    public setParameter(parameter:string):void {
        console.log("Parameter: " + parameter);

        if ("Test2".match(parameter)) {
            console.log("Test10");
            this.width = "10cm";
        }
        this.parameter = parameter;

    }


    private parameterTrackModel:IParameterTrackModel;
    private xOffset:number;
    private yOffset:number;


    addBoundingBox():void {


    }


    onDrop($event:any):void {
        // TODO Try to not use any above

        console.log("Drop: " + $event);

    }

    /**
     A negative yCoord indicates that the line should
     not be drawn
     **/
    markerLineUpdated():void {

    }

    getModel():IParameterTrackModel {
        return this.parameterTrackModel;
    }

    setColour(colour:string):void {
        this.colour = colour;
    }

    render():void {
        this.addBoundingBox();
        var coordinates = this.parameterTrackModel.getParameterPath();
        var path:string = this.generateFullSvgPath(coordinates);


    }

    setHeight(newHeight:number) {
        console.log("Setting height for track: " + newHeight);

        this.height = newHeight;
    }

    setWidth(newWidth:number):void {

        this.width = newWidth;
    }

    setXOffset(xOffset:number):void {
        this.xOffset = xOffset;
    }

    scaleValue(value:number, min:number, max:number):number {
        return (value - min) * this.width / (max - min);
    }

    generateFullSvgPath(coordinates:Array<ValueSummary>):string {
        var svgPath = "M " + this.xOffset + " " + this.yOffset;
        var skipRows = 0;
        var parameterRangeMin = this.parameterTrackModel.getMin();
        var parameterRangeMax = this.parameterTrackModel.getMax();

        for (var row = 0; row < this.height; ++row) {
            if (coordinates[row]) {
                var scaledAverage = this.scaleValue(coordinates[row].average, parameterRangeMin, parameterRangeMax);
                // TODO Use relative path instead?
                svgPath += "L" + (this.xOffset + scaledAverage) + ', ' + (this.yOffset + row);
                skipRows = 0;
            } else {
                skipRows++;
            }
        }
        // console.log('SVG path: ' +svgPath);
        return svgPath;
    }

    getPath():string {
        return this.paintManager.getSvgPathForParameter(this.parameter);
        // return this.path;
    }

}
