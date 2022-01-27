import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request = req.clone({
      headers: new HttpHeaders().set('userName', '1').set('password', '2'),
    });


    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) =>{
        if(error.status === 0){
          console.log(error.message);
          
          }
          else{
              switch (error.status) {
                case 498: break;
                case 401: break;
                default: break;
              }
            
          }
          return throwError(error);
      })
    );
  }
}
