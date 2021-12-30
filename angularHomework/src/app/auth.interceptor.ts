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


  authString: string;

  constructor(private _userAuthService: UserAuthService) {
    this.authString = this._userAuthService.getUserAuthorizationData();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let copyRequest = request.clone({
      headers: new HttpHeaders().set('Authorization', this.authString),
    });

    return next.handle(copyRequest)
  }
}
