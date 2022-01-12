import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appNewsTypeColor]'
})
export class NewsTypeColorDirective {
  @HostBinding('style.background-color') backColor:string = "";
  @Input('appNewsTypeColor') initColor: string = ""
  
  constructor() { }

  ngOnInit(){
    this.backColor = this.initColor;
  }
}
