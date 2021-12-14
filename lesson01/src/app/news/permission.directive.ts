import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import { Permission } from './services/permission.service';

@Directive({
  selector: '[appPermission], appPermission'
})
export class PermissionDirective {
  permissions!: Permission[];

  @Input() set appPermission(perms: Permission[]) {
    this.permissions = perms;
  }
  @Input() appPermissionAction!: string;

  constructor(
    private _tpl: TemplateRef<any>,
    private _vc: ViewContainerRef) { }

  ngOnInit(){
    let item = this.permissions.find(p => p.action == this.appPermissionAction && p.enable);
    if(item != undefined){
      this._vc.createEmbeddedView(this._tpl);
    } else {
      this._vc.clear();
    }
  }
}
