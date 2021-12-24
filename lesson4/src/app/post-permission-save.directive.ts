import { Directive, Input, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { PermissionUser } from './all-posts/users';

@Directive({
  selector: '[appPostPermissionSave]'
})
export class PostPermissionSaveDirective {

  private _permissions: PermissionUser[] = [];
  private _viewRef?: ViewRef;
  @Input() set appPostPermissionSave(permissions: PermissionUser[]) {
    this._permissions = permissions;
    if (this.hasPermissionSave()
    && !this._viewRef) {
      this._viewRef = this.view.createEmbeddedView(this.template);
    }
    else if (this._viewRef){
      const indexView = this.view.indexOf(this._viewRef);
      this.view.remove(indexView);
    }
  }
  constructor(private template: TemplateRef<any>, private view:ViewContainerRef) { }

  private hasPermissionSave(): boolean {
    return this._permissions.includes(PermissionUser.save);
  }

}
