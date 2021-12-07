import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { currentUser } from './user-types';

@Directive({
  selector: '[showByRoles]'
})
export class ShowByRolesDirective implements OnInit {

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef
  ) { }

  ngOnInit() {
    if(currentUser.isAdmin)
      this.view.createEmbeddedView(this.template);
  }
}
