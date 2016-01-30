/*
 Draw parameter values inside a box defined by
 parameters given to the constructor.
 */
import {Component} from "angular2/core";


@Component({
    selector: "parameter-track",
    template: "<div (drop)='addParameter'</div>"
})
class ParameterTrack implements ParameterTrackModelListener {
    private colour: string = '#000000';
    private path: string;
    private raphaelPath:RaphaelPath = undefined;
    private boundingBox:RaphaelElement = undefined;
    private line:RaphaelPath;


    constructor(private parameterTrackModel:ParameterTrackModel,
                private paper:RaphaelPaper,
                private xOffset:number,
                private yOffset:number,
                private width:number,
                private height:number) {
        //this.parameterTrackModel = parameterTrackModel;
        this.parameterTrackModel.addListener(this);
        //this.paper = paper;
        //var xOffset = xOffset;
        //this.yOffset = yOffset;
        //var width = width2;
        //var height = height2;
        //this.colour = '#000000';
        // This represents the drawn line
        //var path = undefined;
        // TODO Is it necessery to have access to both paths?

    }


    addBoundingBox():void {
        this.boundingBox = this.paper.rect(this.xOffset, this.yOffset, this.width, this.height);
        this.boundingBox.attr('stroke', this.colour);
    }


    onDrop($event:any):void {
        // TODO Try to not use any above


    }

    /**
     A negative yCoord indicates that the line should
     not be drawn
     **/
    markerLineUpdated():void {
        if(this.line !== undefined) {
            this.line.remove();
        }
        if(yCoord < 0) {
            return;
        }
        this.line = this.paper.path('M' +this.xOffset +',' +yCoord +"h" +this.width);
        // TODO Colour just for testing
        this.line.attr('stroke', 'blue');
    }

    getModel():ParameterTrackModel {
        return this.parameterTrackModel;
    }

    setColour(colour:string):void {
        this.colour = colour;
    }

    render():void {
        if(this.raphaelPath !== undefined) {
            this.raphaelPath.remove();
            this.boundingBox.remove();
        }
        this.addBoundingBox();
        var coordinates = this.parameterTrackModel.getParameterPath();
        var path:string = this.generateFullSvgPath(coordinates);
        this.raphaelPath = this.paper.path(path);
        this.raphaelPath.attr('stroke', this.colour);
    }

    setHeight(newHeight: number) {
        console.log("Setting height for track: " +newHeight);
        this.paper.setSize(this.width, newHeight);
        this.height = newHeight;
    }

    setWidth(newWidth: number):void {
        this.paper.setSize(newWidth, this.height);
        this.width = newWidth;
    }

    setXOffset(xOffset: number):void {
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

}
