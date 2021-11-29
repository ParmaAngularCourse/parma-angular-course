import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appStyles]'
})
export class StylesDirective {

  @HostBinding('style.color') divColor!: string;
  @HostListener('click', ['$event']) changeColor(event: any) {
    this.divColor = "yellow";
    this.clickChange.emit(10);
  }
  @Input('appStyles') start_color: string = "brown";
  @Output() clickChange = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) {     
    //console.log(elementRef);
  }

  ngOnInit() {
    this.divColor = this.start_color;
    setTimeout(() => { this.divColor = 'green'}, 
      2000);
  }

}
