import {Component, Inject} from "@angular/core";
import {PaintManager} from "./PaintManager";

@Component({
  selector: "zoom-panel",
  template: `
<button (click)="zoomOut()">-</button>
<button (click)="zoomIn()">+</button>
    `
})
export class ZoomComponent {


  constructor(@Inject(PaintManager) private paintManager:PaintManager) {

  }

  zoomOut() {
    this.paintManager.zoomIn();
  }

  zoomIn() {
    this.paintManager.zoomOut();
  }

}
