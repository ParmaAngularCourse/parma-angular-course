import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appNewsTypeStyles]' 
})
export class NewsTypeStylesDirective {

  @HostBinding('style.background-color') divBack?: string;
  
  @HostListener('mouseover', ['$event']) onmouseoverEvent(event: any){
    this.divBack = "darkgray";
  }

  @HostListener('mouseout', ['$event']) onmouseoutEvent(event: any){
    this.divBack = "transparent";
  }

  constructor() { 
  }

}
