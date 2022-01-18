import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, switchMap, takeUntil, throwError } from 'rxjs';
import { User } from './news/user-rights';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
 
  constructor( private _userService: UserService) { 

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._userService.getCurrentUserOberverble().pipe(
      switchMap((data)=> next.handle( request.clone({
        headers: new HttpHeaders().set('Authorization', data.Name)
      })))   
    );
  }
}
