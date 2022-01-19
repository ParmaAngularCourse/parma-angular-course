import {Directive, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appColorizedLabel]'
})
export class ColorizedLabelDirective implements OnInit {

  @HostBinding('style.backgroundColor') backColor: string = "white";
  @Input('appColorizedLabel') color!: string;

  constructor() { }

  ngOnInit(){
    this.backColor = this.color;
  }
}
