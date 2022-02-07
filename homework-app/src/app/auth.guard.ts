import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AsyncSubject, Observable, Subject, takeUntil } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {

  private ngUnsubscribe$: Subject<boolean>;
  private usersSubject!: AsyncSubject<boolean | UrlTree>;
  
  constructor(private router: Router, private usersService: UsersService) {
    this.ngUnsubscribe$ = new Subject();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.usersSubject = new AsyncSubject<boolean | UrlTree>();
    
    this.usersService.isAuth().pipe(
        takeUntil(this.ngUnsubscribe$)
      ).subscribe(
        { next: (data) => {
          if (data) {
            this.usersSubject?.next(true);
            this.usersSubject?.complete();
          }
          else {
            this.usersSubject?.next(this.router.createUrlTree(['/auth']));
            this.usersSubject?.complete();
          }
        },
          error: (error: HttpErrorResponse) => { console.log(`${error.status} ${error.message}`); }
        });
      return this.usersSubject.asObservable();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
