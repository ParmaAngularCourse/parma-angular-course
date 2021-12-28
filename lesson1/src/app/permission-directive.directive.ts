import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPermissionDirective]'
})
export class PermissionDirectiveDirective {

  @Input('appPermissionDirective') userPermission : boolean = false;
  constructor(private template: TemplateRef<any>,
          private view : ViewContainerRef) { }

  ngOnChanges(){
    if(this.userPermission)
      this.view.createEmbeddedView(this.template);
      else
      this.view.clear();
  }
}
