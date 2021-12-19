import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { currentUser } from './user';

@Directive({
  selector: '[appRightsD]'
})
export class RightsDDirective {

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) { 
    
  }

  ngOnInit() {
    if (currentUser.canEdit === 1)
      this.view.createEmbeddedView(this.template);
  }

}
