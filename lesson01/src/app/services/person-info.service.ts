import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {takeUntil} from "rxjs/operators";
import {AuthToken, LoginParams, Permission, PersonInfo} from "../types";

@Injectable({
  providedIn: 'root'
})
export class PersonInfoService implements OnDestroy {

  private _authToken : AuthToken | undefined;

  private _url: string = "/api/";
  private readonly _infoSubject: BehaviorSubject<PersonInfo>;
  private _permissionSubject: BehaviorSubject<Permission[]>;
  private _isAuthorizeSubject?: BehaviorSubject<boolean>;
  private _ngUnsubscribe$: Subject<number>;
  private _isInfoLoaded : boolean = false;
  private _isPermissionLoaded : boolean = false;

  constructor(private _http: HttpClient) {
    this._ngUnsubscribe$ = new Subject<number>();
    this._infoSubject = new BehaviorSubject<PersonInfo>({name: "", family: ""} as PersonInfo);
    this._permissionSubject = new BehaviorSubject<Permission[]>([]);
  }

  public login(params : LoginParams) : Observable<void> {
    let loginSubject = new Subject<void>();
    this._http.post<AuthToken>(this._url + "login", params)
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next: value => {
          this._authToken = value;
          loginSubject?.next();
          this._isInfoLoaded = false;
          this._isPermissionLoaded = false;
          this._isAuthorizeSubject?.next(true);
        },
        error: (err : HttpErrorResponse) => {
          loginSubject?.error(err.error);
        }
      });
    return loginSubject.asObservable();
  }

  public logout() : void  {
    this._http.get<void>(this._url + "logout")
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next: _ => {
          this._authToken = undefined;
          this._isInfoLoaded = false;
          this._isPermissionLoaded = false;
          this._isAuthorizeSubject?.next(false);
        }
      });
  }

  public getPersonInfo() : Observable<PersonInfo> {
    if(!this._isInfoLoaded) {
      this._isInfoLoaded = true;
      this._http.get<PersonInfo>(this._url + "personinfo")
        .pipe(
          takeUntil(this._ngUnsubscribe$)
        )
        .subscribe({
          next: value => {
            this._infoSubject?.next(value);
          },
          error: (error: HttpErrorResponse) => {
            if(error.status === 401){
              this._infoSubject?.next({name:"", family:"", email:""});
            } else {
              this._infoSubject?.error(error);
            }
          }
        });
    }
    return this._infoSubject.asObservable();
  }

  public updatePersonInfo(info : PersonInfo) : void {
    this._http.post<void>(this._url + "personinfo", info)
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        complete: () => {
          if(this._infoSubject){
            this._infoSubject.next(info);
          }
        },
        error: (error: HttpErrorResponse) =>
          console.log(error.status + " " + error.message)
      });
  }

  public getPermissions() : Observable<Permission[]> {
    if(!this._isPermissionLoaded) {
      this._isPermissionLoaded = true;
      this._http.get<Permission[]>(this._url + "permissions")
        .pipe(
          takeUntil(this._ngUnsubscribe$)
        )
        .subscribe({
          next: (val) => {
            this._permissionSubject?.next(val);
          },
          error: (error: HttpErrorResponse) => {
            if(error.status === 401) {
              this._permissionSubject?.next([]);
            } else {
              this._permissionSubject?.error(error);
            }
          }
        });
    }
    return this._permissionSubject.asObservable();
  }

  public getAuthToken() : AuthToken | undefined {
    return this._authToken;
  }

  public isAuthorize() : Observable<boolean> {
    if(!this._isAuthorizeSubject)
    {
      this._isAuthorizeSubject =
        new BehaviorSubject<boolean>( false);
      this._http.get<AuthToken | undefined>(this._url + "isauth")
        .pipe(
          takeUntil(this._ngUnsubscribe$)
        )
        .subscribe({
          next: value => {
            this._authToken = value;
            this._isAuthorizeSubject?.next(value != undefined);
          },
          error: (_ : HttpErrorResponse) => {
            this._isAuthorizeSubject?.next(false);
          }
        });
    }
    return this._isAuthorizeSubject.asObservable();
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
