import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { myRoles, Role } from './news/roles';

@Directive({
  selector: '[appRights]'
})
export class RightsDirective {

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) { }

  @Input() set appRights(role: Role) {
    if (myRoles.includes(role)) {
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }
}
