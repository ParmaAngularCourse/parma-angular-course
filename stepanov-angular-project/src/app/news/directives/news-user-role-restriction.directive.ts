import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { currentUser, UserRights } from '../i-user-types';

@Directive({
  selector: '[appNewsUserRoleRestriction]'
})
export class NewsUserRoleRestrictionDirective {

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) 
  { }

  ngOnInit() {
    if (currentUser.rights == UserRights.Admin) {
      this.view.createEmbeddedView(this.template);
    }
  }
}