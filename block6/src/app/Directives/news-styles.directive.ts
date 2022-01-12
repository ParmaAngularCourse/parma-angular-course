import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appNewsStyles]'
})
export class NewsStylesDirective {
  @HostBinding('style.border') borderParam:string = "";
  @Input('appNewsStyles') initBorderParam:{
    color:string,
    size:string,
    style:string
  } = {
    color: 'white',
    size: 'inherit',
    style: 'hidden'
  };

  constructor() {     
  } 

  ngOnInit(){
    this.borderParam = `${this.initBorderParam.size} ${this.initBorderParam.style} ${this.initBorderParam.color}`;
  }
}
