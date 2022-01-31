import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionUser } from './all-posts/users';

@Directive({
  selector: '[appPostPermissionDelete]'
})
export class PostPermissionDeleteDirective {

  private _permissions: PermissionUser[] = [];
  @Input() set appPostPermissionDelete(permissions: PermissionUser[] | null | undefined) {
    this._permissions = permissions || [];
    if (!this.hasPermissionDelete()) {
      this.view.clear();
    }
    else if (this.view.length == 0) {
      this.view.createEmbeddedView(this.template);
    }
  }

  constructor(private template: TemplateRef<any>, private view:ViewContainerRef) { }

  ngOnInit() {
  }

  private hasPermissionDelete(): boolean {
    return this._permissions.includes(PermissionUser.delete);
  }
}
