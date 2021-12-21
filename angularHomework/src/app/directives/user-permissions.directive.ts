import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUserPermissions]'
})
export class UserPermissionsDirective {

  @Input('appUserPermissions') obj: {currUser: any, permission: string} | undefined;

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) { 
  }


  ngOnInit() {
    if (this.obj && this.obj.currUser[this.obj.permission])
       this.view.createEmbeddedView(this.template);   
  }
}
