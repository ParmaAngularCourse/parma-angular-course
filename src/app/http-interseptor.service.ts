import { Injectable } from '@angular/core';
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { myRoles } from './news/roles';

@Injectable({
  providedIn: 'root'
})
export class HttpInterseptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let r = req.clone({ headers: new HttpHeaders().set("Authorization", "mvd:" + myRoles) });
    return next.handle(r);
  }
}
