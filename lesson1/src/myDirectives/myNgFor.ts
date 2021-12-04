import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[myFor]'
})
export class MyForDirective {

    constructor(
        // Реализация ng-template
        private templateRef: TemplateRef<any>,
        // Контейнер для добавления/удаления TemplateRef'ов
        private viewContainer: ViewContainerRef
    ) {
    }

    @Input()
    set myFor(collection: Array<any>) {
        for (let i in collection)
            this.viewContainer.createEmbeddedView(this.templateRef);
    }
}