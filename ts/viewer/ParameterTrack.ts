/*
 Draw parameter values inside a box defined by
 parameters given to the constructor.
 */
import {Component, Input} from "angular2/core";
import {IParameterTrackModel} from "../backend/IParameterTrackModel";
import {NgFor} from "angular2/common";



@Component({
    selector: "parameter-track",
    inputs: ['path'],
    template: `<h2>Test3: {{parameter}}</h2>
 <svg [viewBox]="getPath()"
         preserveAspectRatio="xMidYMid meet">
      <g style="stroke:#660000;">
      <path [attr.d]="path"/>
      </g>
      
      <!--<g stroke="green" fill="white" stroke-width="5">-->
     <!--<circle cx="25" cy="25" r="15"/>-->
     <!--<circle cx="40" cy="25" r="15"/>-->
     <!--<circle cx="55" cy="25" r="15"/>-->
     <!--<circle cx="70" cy="25" r="15"/>-->
   <!--</g>-->
   
      </svg>
`
    // directives: [NgFor]
    // template: "<div (drop)='addParameter'</div>"
    // template: "<div (drop)='addParameter'>{{parameter}}<svg:rect x=\"0\" y=\"0\" width=\"100\" height=\"100\"/></div>"
})
export class ParameterTrack implements ParameterTrackModelListener {
    private colour: string = '#000000';
    
    // TODO Just setting the value for testing
    path: string ="M50,50 A30,50 0 0,1 100,100";
    
    private raphaelPath:RaphaelPath = undefined;
    private boundingBox:RaphaelElement = undefined;
    private line:RaphaelPath;
    
    parameter:string;


    private parameterTrackModel:IParameterTrackModel;
                private paper:RaphaelPaper;
                private xOffset:number;
                private yOffset:number;
                private width:number;
                private height:number;


    addBoundingBox():void {
        this.boundingBox = this.paper.rect(this.xOffset, this.yOffset, this.width, this.height);
        this.boundingBox.attr('stroke', this.colour);
    }
    
    setParmeter(parameter:string):void {
        console.log("Setting parameter to: " +parameter);
        
        this.parameter = parameter;
        
    }


    onDrop($event:any):void {
        // TODO Try to not use any above
        
        console.log("Drop: " +$event);

    }

    /**
     A negative yCoord indicates that the line should
     not be drawn
     **/
    markerLineUpdated():void {
        if(this.line !== undefined) {
            this.line.remove();
        }
        //if(this.yCoord < 0) {
        //    return;
        //}
        this.line = this.paper.path('M' +this.xOffset +',' +this.yOffset +"h" +this.width);
        // TODO Colour just for testing
        this.line.attr('stroke', 'blue');
    }

    getModel():IParameterTrackModel {
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
    
    getPath():string {
        return this.path;
    }

}
