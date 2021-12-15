import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRights } from '../i-user-types';

@Directive({
  selector: '[appNewsUserRoleRestriction]'
})
export class NewsUserRoleRestrictionDirective {
  public rights!: UserRights

  @Input() set appNewsUserRoleRestriction(userRights: UserRights) {
    this.rights = userRights;
  }

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) 
  { }

  ngOnInit() {
    if (this.rights == UserRights.Admin) {
      this.view.createEmbeddedView(this.template);
    }
  }
}