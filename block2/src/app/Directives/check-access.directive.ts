import { HttpErrorResponse } from '@angular/common/http';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/model/User';
import { AuthorizationService } from '../service/authorization.service';

@Directive({
  selector: '[appCheckAccess]'
})
export class CheckAccessDirective {
  @Input('appCheckAccess') AccessKey:string = ""
  private unsubscriptionSubj!:Subject<void>

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef, private authService: AuthorizationService) { }

  ngOnInit(){
    this.unsubscriptionSubj = new Subject();
    this.authService.GetCurrentUser()
    .pipe(
      takeUntil(this.unsubscriptionSubj)
    )
    .subscribe({
      next: (data) => {
        var currentUser = data;
        var permission = currentUser.permissions.find(x=>x.key === this.AccessKey);
        if(permission){
          if(permission.access){
            this.view.createEmbeddedView(this.template);        
          }
          else{
            this.view.clear();
          }
        }
        //this.cd.markForCheck();
      },
      error: (error: HttpErrorResponse) => 
      {
        console.log(error.status + ' ' + error.message);
        this.view.clear(); 
      }
    });
  }

  ngOnDestroy(){
    this.unsubscriptionSubj.next();
    this.unsubscriptionSubj.complete();
  }
}
