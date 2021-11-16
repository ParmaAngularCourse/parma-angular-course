import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myIf]'
})
export class MyIfDirective {

  constructor(
      // Реализация ng-template
      private templateRef: TemplateRef<any>,
      // Контейнер для добавления/удаления TemplateRef'ов
      private viewContainer: ViewContainerRef
  ) {
  }

  @Input()
  set myIf(val:boolean) {
    if(val) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}