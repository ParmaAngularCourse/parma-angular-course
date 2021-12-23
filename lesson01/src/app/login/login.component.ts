import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonInfoService} from "../services/person-info.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  private _ngUnsubscribe$: Subject<number>;

  loginGroup! : FormGroup;
  errorInLogin :  boolean = false;
  errorMess : string = "";

  get loginField() : FormControl {
    return this.loginGroup.get("loginField") as FormControl;
  }
  get passwordField() : FormControl {
    return this.loginGroup.get("passwordField") as FormControl;
  }

  constructor(private _personInfoService: PersonInfoService,
              private _router : Router,
              private _cd: ChangeDetectorRef) {
    this._ngUnsubscribe$ = new Subject<number>();
  }

  ngOnInit(): void {
    this.loginGroup = new FormGroup({
      loginField: new FormControl('', [Validators.required]),
      passwordField: new FormControl('', [Validators.required]),
    })
  }

  login() {
    this._personInfoService.login(
      {
        login: this.loginField.value,
        password: this.passwordField.value
      })
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next: val => {
          this._router.navigate(['main/news/']);
        },
        error: (errorMess: string) => {
          this.errorInLogin = true;
          this.errorMess = errorMess;
          this._cd.detectChanges();
        }
      })
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
