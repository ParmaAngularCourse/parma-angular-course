import { Directive, ElementRef, HostBinding, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUserRightsStr]'
})

export class UserRightsStrDirective {

  @HostBinding('style.color') divBack?: string;
  @Input('appUserRightsStr') user_rights!: boolean;

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) {

   }

   ngOnInit(){

    if(this.user_rights){
    this.view.createEmbeddedView(this.template);
    }

   }

}
