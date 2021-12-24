import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appNewsTypeStyle]'
})
export class NewsTypeStyleDirective {

  @HostBinding('style.color') color?: string;
  @Input('appNewsTypeStyle') inputColor?: string;
  ngOnInit() {
    this.color = this.inputColor;
  }
}
