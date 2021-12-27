import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonInfoService} from "./services/person-info.service";
import {Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'lesson07';

  isAuthorized: boolean = false;
  userName: string = "";
  private _ngUnsubscribe$: Subject<number>;
  private persInfoSubscribe$: Subscription;

  constructor(private _personInfoService: PersonInfoService,
              private _router : Router) {
    this._ngUnsubscribe$ = new Subject<number>();
    this.persInfoSubscribe$ = new Subscription();
  }

  ngOnInit(): void {
    this._personInfoService.isAuthorize()
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(val => {
        this.isAuthorized = val;
        if (this.isAuthorized)
          this.addPersonalInfoSubscription();
      });
  }

  logout(): void {
    this._router.navigate(['login']).then(value => {
      if(value) {
        this._personInfoService.logout()
          .pipe(
            takeUntil(this._ngUnsubscribe$)
          )
          .subscribe(_ => {
            this.removePersonalInfoSubscription();
          });
      }
    });
  }

  private addPersonalInfoSubscription() : void {
    this.persInfoSubscribe$ = this._personInfoService.getPersonInfo()
      .subscribe(
        val => this.userName = val.name + " " + val.family
      );
  }

  private removePersonalInfoSubscription() : void {
    this.persInfoSubscribe$.unsubscribe();
    this.userName = "";
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
