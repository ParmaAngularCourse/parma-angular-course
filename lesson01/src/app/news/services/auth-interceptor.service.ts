import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';
import {PermissionService} from "./permission.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _permService: PermissionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req.clone({
      headers: new HttpHeaders().set("AuthToken", this._permService.getAuthToken())
    });
    return next.handle(request);
  }
}
