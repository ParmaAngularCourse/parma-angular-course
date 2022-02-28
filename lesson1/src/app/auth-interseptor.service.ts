import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthInterseptorService implements HttpInterceptor {
//   AuthString: string;

//   constructor(private authService: AuthServiceService) {
//     this.AuthString = authService.AuthString();
//   }
  
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return next.handle(
//       req.clone({
//         headers: new HttpHeaders().set('Authorization', this.authService.IsUserAdmin().toString()),
//       })
//     );
//   }
// }
