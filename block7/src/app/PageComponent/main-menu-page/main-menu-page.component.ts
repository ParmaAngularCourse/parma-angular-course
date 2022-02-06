import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthorizationService } from '../../service/authorization.service';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuPageComponent implements OnInit {
  private unsubscriptionSubj!:Subject<void>
  public logLinkText:string = '';
  constructor(private authService: AuthorizationService, private cd:ChangeDetectorRef){}

  ngOnInit(): void {
    this.unsubscriptionSubj = new Subject();
    this.authService.UserIsAuthorized()
    .pipe(
      takeUntil(this.unsubscriptionSubj)
    ).subscribe(isAuth=>{
      if(isAuth){
        this.logLinkText = 'Выход'
      }
      else{
        this.logLinkText = 'Вход'
      }
      this.cd.markForCheck()
    })
  }

  ngOnDestroy(){
    this.unsubscriptionSubj.next();
    this.unsubscriptionSubj.complete();
  }

}
