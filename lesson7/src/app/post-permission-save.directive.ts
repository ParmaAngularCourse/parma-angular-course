import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionUser } from './all-posts/users';

@Directive({
  selector: '[appPostPermissionSave]'
})
export class PostPermissionSaveDirective {

  private _permissions: PermissionUser[] = [];
  @Input() set appPostPermissionSave(permissions: PermissionUser[] | null | undefined) {
    this._permissions = permissions || [];
    if (!this.hasPermissionSave()) {
      this.view.clear();
    }
    else if (this.view.length == 0) {
      this.view.createEmbeddedView(this.template);
    }
  }

  constructor(private template: TemplateRef<any>, private view:ViewContainerRef) { }

  private hasPermissionSave(): boolean {
    return this._permissions.includes(PermissionUser.save);
  }

}
