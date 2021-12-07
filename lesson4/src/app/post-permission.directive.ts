import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPostPermission]'
})
export class PostPermissionDirective {

  private _condition: boolean = false;
  @Input() set appPostPermission(condition: boolean) {
    this._condition = condition;
    if (this._condition) {
      this.view.createEmbeddedView(this.template);
    }
  }
  constructor(private template: TemplateRef<any>, private view:ViewContainerRef) { }

  ngOnInit() {
    //this.view.createEmbeddedView(this.template);
  }
}
