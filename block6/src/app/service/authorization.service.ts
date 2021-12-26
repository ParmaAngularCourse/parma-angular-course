import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerResponse } from 'src/model/ServerResponse';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  private userSubject?:BehaviorSubject<User>;
  
  constructor(private httpService:HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var request = req.clone({
      headers: new HttpHeaders().set('Authorization', 'user1||password1')
    }) 
    return next.handle(request);
  }

  public GetCurrentUser():Observable<User>{
    if(!this.userSubject){
      this.userSubject = new BehaviorSubject<User>(new User());
      this.httpService.get<ServerResponse<User>>('https://localhost:44379/api/Auth/GetUserInfo')
      .pipe()
      .subscribe({
        next: (response)=> { 
          var user:User = new User();
          if (response.isSuccess === false) {
            console.error(`Ошибка при получении данных c сервера: ${response.errorText}`)
          }
          else{
            user = response?.data ?? new User()
          }          
          this.userSubject?.next(user); 
        },
        error:(err)=> { console.error(`Ошибка при получении данных c сервера: ${err}`)}        
      });
    } 

    return this.userSubject.asObservable();   
  }  
}
