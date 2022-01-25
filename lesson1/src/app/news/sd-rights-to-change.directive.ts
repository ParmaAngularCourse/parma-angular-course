import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSdRightsToChange]'
})
export class SdRightsToChangeDirective {

  @Input('appSdRightsToChange') 
  set hasRights(value: boolean){  
    if (value){
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) { }
}
