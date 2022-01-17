import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonInfoService} from "./services/person-info.service";
import {of, Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
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

  constructor(private _personInfoService: PersonInfoService,
              private _router : Router) {
    this._ngUnsubscribe$ = new Subject<number>();
  }

  ngOnInit(): void {
    this._personInfoService.isAuthorize()
      .pipe(
        switchMap(isAuthorized => {
          this.isAuthorized = isAuthorized;
          return isAuthorized ? this._personInfoService.getPersonInfo() : of(null)
        }),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(personalInfo => {
        this.userName = personalInfo ? personalInfo.name + " " + personalInfo.family : ''
      });
  }

  logout(): void {
    this._personInfoService.logout();
    this._router.navigate(['login']).then(_ => {});
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
