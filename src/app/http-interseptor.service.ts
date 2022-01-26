import { Injectable } from '@angular/core';
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterseptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let userInfo = "unauthorized";
    if (localStorage.getItem('currentUser') != null) {
      const user = JSON.parse(localStorage.getItem('currentUser') ?? "");
      userInfo = user.login + ": " + user.roles;
    }
    const r = req.clone({ headers: new HttpHeaders().set("Authorization", userInfo) });
    return next.handle(r);
  }
}
