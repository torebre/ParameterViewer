import {Component, Inject, OnInit} from "@angular/core";
import {PaintManager} from "./PaintManager";


@Component({
  selector: 'mini-view',
  template: `
        <svg class="miniView" [attr.viewBox]="viewBox" preserveAspectRatio="none">
           <rect x="0" [attr.y]="viewBoxStart" opacity="0.2" fill="blue" width = "20" [attr.height]="viewBoxHeight"
           (mousedown)="onMouseDown($event)" (mouseup)="stopDragging()" (mousemove)="onMouseMove($event)" 
           (mouseout)="stopDragging()"/>          
        </svg>
    `
})
export class MiniView implements OnInit {
  fullHeight:number = 100;

  viewBox:string = "0 0 20 100";

  viewBoxStart:number = 0;
  viewBoxHeight:number;

  private initialRangeFactor:number;

  dragStart:number = 0;

  mouseButtonDown:boolean = false;


  constructor(@Inject(PaintManager) private paintManager:PaintManager) {

  }

  ngOnInit() {
      this.paintManager.getParameterUpdates().subscribe(input => {
        this.initialRangeFactor = this.paintManager.getZoomFactor();
        this.viewBoxHeight = this.initialRangeFactor * this.fullHeight;
      });
  }

  onMouseDown(event:MouseEvent) {
    this.dragStart = event.clientX;
    this.mouseButtonDown = true;
  }

  stopDragging() {
    this.mouseButtonDown = false;
  }

  onMouseMove(event:MouseEvent) {
    if (this.mouseButtonDown) {
      var newStart:number = event.movementY + this.viewBoxStart;

      console.log("New start: " +newStart);

      if(newStart + this.viewBoxHeight > this.fullHeight) {
        newStart = this.fullHeight - this.viewBoxHeight;
      }
      else if(newStart < 0) {
        newStart = 0;
      }
      if(this.viewBoxStart != newStart) {
        this.viewBoxStart = newStart;
        this.paintManager.visibleRangeChanged(this.transformToIndexRange(this.viewBoxStart));
      }
    }
  }

  private transformToIndexRange(scrollIndex:number):number {
    return Math.floor((scrollIndex / 100) * (this.paintManager.maxIndex - this.paintManager.minIndex)
      + this.paintManager.minIndex);
  }

}
