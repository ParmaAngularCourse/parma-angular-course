import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { ParentComponentComponent } from './parent-component/parent-component.component';

@Directive({
  selector: '[appStructD]'
})
export class StructDDirective {

  constructor(private template: TemplateRef<any>, private parentComp: ParentComponentComponent) {
    this.parentComp.childComponentTemplate = this.template;
  }

   ngOnInit() {
   }
}
