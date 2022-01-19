import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';
import {PersonInfoService} from "./person-info.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _personInfoService: PersonInfoService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this._personInfoService.getAuthToken();
    if(token) {
      let request = req.clone({
        headers: new HttpHeaders().set("AuthToken", JSON.stringify(token))
      });
      return next.handle(request);
    } else {
      return next.handle(req);
    }
  }
}
