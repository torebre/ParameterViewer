import {Component, Inject, OnInit} from "@angular/core";
import {PaintManager} from "./PaintManager";


@Component({
  selector: 'mini-view',
  template: `
<h2>Test20</h2>
        <svg class="miniView" [attr.viewBox]="viewBox" preserveAspectRatio="none">
           <rect x="0" [attr.y]="viewBoxStart" opacity="0.2" fill="blue" width = "20" [attr.height]="viewBoxHeight"
           (mousedown)="onMouseDown($event)" (mouseup)="stopDragging()" (mousemove)="onMouseMove($event)" (mouseout)="stopDragging()"
         (click)="onClicked()"/>          
        </svg>
    `
})
export class MiniView implements OnInit {

  // TODO Where should these come from?
  fullHeight:number = 100;

  viewBox:string = "0 0 20 100";

  viewBoxStart:number = 0;
  viewBoxHeight:number = 10;

  private initialRangeFactor = 0.1;

  dragStart:number = 0;

  mouseButtonDown:boolean = false;


  constructor(@Inject(PaintManager) private paintManager:PaintManager) {

  }


  ngOnInit():any {
    return undefined;
  }


  onClicked() {

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
        // TODO The range is not the same as the box height
        this.paintManager.visibleRangeChanged(this.transformToIndexRange(this.viewBoxStart),
          Math.floor((this.paintManager.maxIndex - this.paintManager.minIndex) * this.initialRangeFactor));
      }
    }
  }

  private transformToIndexRange(scrollIndex:number):number {
    return Math.floor((scrollIndex / 100) * (this.paintManager.maxIndex - this.paintManager.minIndex)
      + this.paintManager.minIndex);
  }

}
