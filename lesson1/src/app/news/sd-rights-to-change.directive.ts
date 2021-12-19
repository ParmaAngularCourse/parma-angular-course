import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSdRightsToChange]'
})
export class SdRightsToChangeDirective {
  @Input('appSdRightsToChange') hasRights: boolean = false; 

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) { }

  //ngOnInit() 
  ngOnChanges() {
    //Возвращение видимости элементу к которому добавлена директива
    console.log(this.hasRights);
    if (this.hasRights){
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }
  

}
