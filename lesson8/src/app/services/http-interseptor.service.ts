import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AUTH_COOKIE_NAME, NAME_USER_COOKIE } from '../consts';
import { dataAuth, UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterseptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  private getCookieAuth(): dataAuth | null {
    let result = null;
    let cookieService = this.injector.get(CookieService);
    if (cookieService) {
      let access_token = cookieService.get(AUTH_COOKIE_NAME);
      let username = cookieService.get(NAME_USER_COOKIE);
      if (access_token && username) {
        result = { access_token: access_token, username: username };
      }
    }
    return result;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers;
    if (req.url && req.url.indexOf('token') === -1) {
      let authCookie = this.getCookieAuth();

      if (authCookie) {
        headers = headers.set('username', authCookie.username);
        headers = headers.set(
          'Authorization',
          `Bearer ${authCookie.access_token}`
        );
      }
    }
    let reqClone = req.clone({
      headers: headers,
    });
    return next.handle(reqClone);
  }
}
