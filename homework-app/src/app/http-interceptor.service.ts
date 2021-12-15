import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private _usersService: UsersService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userName = this._usersService.getCurrentUserName();
    let req = request.clone({
      headers: new HttpHeaders().set('Authorization', userName)
    });
    return next.handle(req);
  }
}
