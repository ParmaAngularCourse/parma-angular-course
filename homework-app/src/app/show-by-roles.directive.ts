import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { currentUser } from './user-types';
import { UsersService } from './users.service';

@Directive({
  selector: '[showByRoles]'
})
export class ShowByRolesDirective implements OnInit {

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private _usersService: UsersService
  ) { }

  ngOnInit() {
    if(this._usersService.isCurrentUserAdmin())
      this.view.createEmbeddedView(this.template);
  }
}
