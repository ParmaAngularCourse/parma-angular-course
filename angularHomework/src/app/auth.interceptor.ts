import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-authservice';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _userAuthService: UserAuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._userAuthService.isAuthorised()) {
      let copyRequest = request.clone({
        headers: new HttpHeaders().set('Authorization', this._userAuthService.getUserAuthorizationData()),
      });

      return next.handle(copyRequest)
    }

    return next.handle(request);
  }
}
