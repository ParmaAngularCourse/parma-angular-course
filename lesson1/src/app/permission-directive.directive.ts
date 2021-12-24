import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPermissionDirective]'
})
export class PermissionDirectiveDirective {

  @Input('appPermissionDirective') userPermission : boolean = false;
  constructor(private template: TemplateRef<any>,
          private view : ViewContainerRef) { }

  ngOnInit(){
    if(this.userPermission)
      this.view.createEmbeddedView(this.template);
  }
}
