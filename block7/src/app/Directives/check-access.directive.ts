import { HttpErrorResponse } from '@angular/common/http';
import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthorizationService } from '../service/authorization.service';


@Directive({
  selector: '[appCheckAccess]'
})
export class CheckAccessDirective implements OnInit, OnDestroy {
  @Input('appCheckAccess') AccessKey:string = ""
  private unsubscriptionSubj!:Subject<void>

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef, private authService: AuthorizationService) { }

  ngOnInit(){
    this.unsubscriptionSubj = new Subject();
    this.authService.GetCurrentUser()
    .pipe(takeUntil(this.unsubscriptionSubj))
    .subscribe({
      next: (currentUser) => {        
        var permission = currentUser.permissions?.find(x=>x.key === this.AccessKey);
        if(permission){
          if(permission.access){
            if(this.view.length === 0){
              this.view.createEmbeddedView(this.template);  
            }      
          }
          else{
            this.view.clear();
          }
        }
        else{
          this.view.clear();
        }        
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
