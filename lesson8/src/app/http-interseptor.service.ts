import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterseptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers;
    if (req.url && req.url.indexOf('token') === -1) {
      let userInfoService = this.injector.get(UserInfoService);
      if (userInfoService && userInfoService.dataAuth !== null) {
        const dataAuth = userInfoService.dataAuth;
        headers = headers.set('username', dataAuth.username);
        headers = headers.set('Authorization', `Bearer ${dataAuth.access_token}`);
      }
    }
    let reqClone = req.clone({
      headers: headers,
    });
    return next.handle(reqClone);
  }
}
