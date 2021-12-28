import { Directive, Input, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { PermissionUser } from './all-posts/users';

@Directive({
  selector: '[appPostPermissionDelete]'
})
export class PostPermissionDeleteDirective {

  private _permissions: PermissionUser[] = [];
  private _viewRef?: ViewRef;
  @Input() set appPostPermissionDelete(permissions: PermissionUser[]) {
    this._permissions = permissions;
    if (this.hasPermissionDelete()
    && !this._viewRef) {
      this._viewRef = this.view.createEmbeddedView(this.template);
    }
    else if (this._viewRef){
      const indexView = this.view.indexOf(this._viewRef);
      this.view.remove(indexView);
      this._viewRef.destroy();
      this.view.clear();
    }
  }
  constructor(private template: TemplateRef<any>, private view:ViewContainerRef) { }

  ngOnInit() {
    //this.view.createEmbeddedView(this.template);
  }

  private hasPermissionDelete(): boolean {
    return this._permissions.includes(PermissionUser.delete);
  }
}
