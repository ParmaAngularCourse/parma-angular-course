import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CurrentUser } from 'src/model/CurrentUser';

@Directive({
  selector: '[appCheckAccess]'
})
export class CheckAccessDirective {
  @Input('appCheckAccess') AccessKey:string = ""

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) { }

  ngOnInit(){
    var permission = CurrentUser.Permissions.find(x=>x.Key === this.AccessKey);
    if(permission){
      if(permission.Access){
        this.view.createEmbeddedView(this.template);        
      }
      else{
        this.view.clear();
      }
    }
  }
}
