import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBgnD]'
})
export class BgnDDirective {

  @HostBinding('style.background') bgnColor!: string; 
  @Input('appBgnD') start_color: string = "white";

  ngOnInit() {
    this.bgnColor = this.start_color;
  }

}
