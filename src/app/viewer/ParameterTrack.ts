/*
 Draw parameter values inside a box defined by
 parameters given to the constructor.
 */
import {Component, Input, Inject, OnInit} from "@angular/core";
import {IParameterTrackModel} from "../backend/IParameterTrackModel";
import {PaintManager} from "./PaintManager";
import {ValueSummary} from "./ValueSummary";


@Component({
  selector: "parameter-track",
  template: `
<div class="parameterTrack">
        <svg [attr.viewBox]="viewBox"
        preserveAspectRatio="none">
        <path [attr.d]="getPath()" [attr.stroke]="colour" stroke-width="1" fill="none"/>
        </svg>
        </div>
    `
})
export class ParameterTrack implements OnInit {
  private colour:string = '#0000FF';

  // [attr.width]="width"
// <g style="stroke:#660000;">

  // width:string = "5cm";

  // preserveAspectRatio="xMidYMid meet">

  private widthNumber:number = 5;
  private min:number = -1;
  private max:number = 1;


  viewBox:string = "0 0 20 100";

  private height:number = 1000;

  private path:string;

  private errorMessage:any;

  private parameterTrackModel:IParameterTrackModel;
  private xOffset:number = 0;
  private yOffset:number = 0;



  // @Inject(ElementRef) private elementRef:ElementRef;

  // TODO Figure out exactly what the Input-annotation does
  @Input() parameter:string;


  constructor(@Inject(PaintManager) private paintManager:PaintManager) {

    console.log("Paint manager: " + paintManager);

  }


  public setParameter(parameter:string):void {
    this.parameter = parameter;
  }

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

  setHeight(newHeight:number) {
    console.log("Setting height for track: " + newHeight);

    this.height = newHeight;
  }

  setXOffset(xOffset:number):void {
    this.xOffset = xOffset;
  }

  scaleValue(value:number, min:number, max:number):number {
    return (value - min) * this.widthNumber / (max - min);
  }

  private generateFullSvgPath(values:number[]) {
    if(values === undefined) {
      // TODO This should be avoided earlier
      return;
    }
    var scaledValue = this.scaleValue(values[0], this.min, this.max);
    var svgPath = "M " + (this.xOffset + scaledValue) + " " + this.yOffset;

    // TODO Just setup like this for testing

    for (var index = 1; index < values.length; ++index) {
      if (!isNaN(values[index])) {
        scaledValue = this.scaleValue(values[index], this.min, this.max);
        svgPath += "L" + (this.xOffset + scaledValue) + ', ' + (this.yOffset + index);
      }
    }

    // var skipRows = 0;
    // var parameterRangeMin = this.parameterTrackModel.getMin();
    // var parameterRangeMax = this.parameterTrackModel.getMax();
    //
    // for (var row = 0; row < this.height; ++row) {
    //     if (coordinates[row]) {
    //         var scaledAverage = this.scaleValue(coordinates[row].average, parameterRangeMin, parameterRangeMax);
    //         // TODO Use relative path instead?
    //         svgPath += "L" + (this.xOffset + scaledAverage) + ', ' + (this.yOffset + row);
    //         skipRows = 0;
    //     } else {
    //         skipRows++;
    //     }
    // }
    // console.log('SVG path: ' +svgPath);
    return svgPath;


  }

  ngOnInit():any {
    this.paintManager.getParameterUpdates().subscribe(input => {
      console.log("Got parameter update");
      this.path = this.generateFullSvgPath(this.paintManager.getPath());
      // this.path = this.paintManager.getPath();
    });
    return undefined;
  }

  getPath():string {
    return this.path;
  }

}
