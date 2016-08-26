import {Directive, ElementRef} from "@angular/core";

@Directive({
  selector: ".marker"
})
export class MarkerDirective {

  private el: HTMLElement;

  constructor(el: ElementRef) { this.el = el.nativeElement; }


  public getHTMLElement():HTMLElement {
    return this.el;
  }

}
