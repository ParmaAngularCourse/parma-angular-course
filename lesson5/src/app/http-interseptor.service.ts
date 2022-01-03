import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterseptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ggggggg');
    if (req.url && (req.url.indexOf('UserInfo') === -1)) {
      let userInfoService = this.injector.get(UserInfoService);
      if (userInfoService) {
        const currentUser = userInfoService.userCurrent;
        headers = headers.set('username', currentUser.name);
      }
    }
    let reqClone = req.clone({
      headers: headers
    });
    return next.handle(reqClone);
  }
}
