import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appNewsTypeStyle]'
})
export class NewsTypeStyleDirective {

  @Input('appNewsTypeStyle') backgroundColor: string = "white";

  @HostBinding("style.background-color") backgroundColorStyle!: string;
  
  constructor() { }

  ngOnInit() {
    this.backgroundColorStyle = this.backgroundColor;
  }

}
