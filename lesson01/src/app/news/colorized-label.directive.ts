import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appColorizedLabel]'
})
export class ColorizedLabelDirective {

  @HostBinding('style.backgroundColor') backColor: string = "white";
  @Input('appColorizedLabel') color!: string;

  constructor() { }

  ngOnInit(){
    this.backColor = this.color;
  }
}
