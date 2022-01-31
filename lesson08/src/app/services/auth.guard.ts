import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AsyncSubject, Observable, Subject} from 'rxjs';
import {PersonInfoService} from "./person-info.service";
import {takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {
  private _ngUnsubscribe$: Subject<number>;
  private authSubject$?: AsyncSubject<boolean | UrlTree>;

  constructor(private _router: Router,
              private _personInfoService: PersonInfoService) {
    this._ngUnsubscribe$ = new Subject<number>();

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authSubject$ = new AsyncSubject<boolean | UrlTree>();

    this._personInfoService.isAuthorize()
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next: value => {
          if(value) {
            this.authSubject$?.next(true);
            this.authSubject$?.complete();
          }
          else {
            this.authSubject$?.next(this._router.parseUrl("/login"));
            this.authSubject$?.complete();
          }
        }
      });

    return this.authSubject$.asObservable();
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
