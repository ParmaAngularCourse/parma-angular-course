import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ServerResponse } from 'src/model/ServerResponse';
import { StatusMsg } from 'src/model/StatusMsg';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {
  private unsubscriptionSubj!:Subject<void>
  private userSubject?:BehaviorSubject<User>;
  private login:string = '';
  private password:string = '';
  readonly LoginMetaDataKey:string = 'InterceptorMetaDataLogin';
  readonly PasswordMetaDataKey:string = 'InterceptorMetaDataPassword';
  
  constructor(private httpService:HttpClient){
    this.unsubscriptionSubj = new Subject();
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Интерцептор создает новый инстанс! синглтон!! сервиса!!!, из-за этого приходится приплясывать с лишними параметрами в запросах что бы передать ему новые значение лоигна и пароля
    var params = req.params;
    var loginFromContext = req.params.get(this.LoginMetaDataKey)
    if(loginFromContext !== null){
      this.login = loginFromContext;
      params = params.delete(this.LoginMetaDataKey);
    }

    var passwordFromContext = req.params.get(this.PasswordMetaDataKey)
    if(passwordFromContext !== null){
      this.password = passwordFromContext;
      params = params.delete(this.PasswordMetaDataKey);
    }

    var request = req.clone({      
      headers: new HttpHeaders().set('Authorization', `${this.login}||${this.password}`),
      params: params
    }) 
    return next.handle(request);
  }

  public GetCurrentUser():Observable<User>{
    if(!this.userSubject){
      this.userSubject = new BehaviorSubject<User>(new User());
      this.GetCurrentUserFromServer()
      .pipe(
        takeUntil(this.unsubscriptionSubj)
      )
      .subscribe({
        next: (response)=> { 
          var user:User = new User();
          if (response.isSuccess === false) {
            console.error(`Ошибка при получении данных c сервера: ${response.errorText}`)
          }
          else{
            user = response?.data ?? new User()
          }          
          this.SetCurrentUser(user);
        },
        error:(err)=> { console.error(`Ошибка при получении данных c сервера: ${err.message}`)}        
      });;
    } 

    return this.userSubject.asObservable();   
  }

  private GetCurrentUserFromServer():Observable<ServerResponse<User>>{
    var params = new HttpParams().set(this.LoginMetaDataKey, this.login).set(this.PasswordMetaDataKey, this.password) 
    return this.httpService.get<ServerResponse<User>>('/api/Auth/GetUserInfo', { params: params })
  }
  
  public UpdateUserProfile(user:User):Observable<StatusMsg>{
    var resultSubject = new AsyncSubject<StatusMsg>();
    this.httpService.post<ServerResponse<User>>('/api/Auth/UpdateUserProfile', user)
    .pipe(takeUntil(this.unsubscriptionSubj))
    .subscribe({
      next: (response)=> {
        if (response.isSuccess === false) {
          this.SendMsgStatusMessage(resultSubject, false, `При попытке обновить профиль пользователя возникла ошибка: ${response.errorText}`);              
        }
        else{
          if(response?.data){
            this.SetCurrentUser(response.data);
            this.SendMsgStatusMessage(resultSubject, true, "Данные успешно сохранены");  
          }
        }         
      },
      error:(err)=> { 
        this.SendMsgStatusMessage(resultSubject, false, `При попытке обновить профиль пользователя возникла ошибка: ${err.message}`); 
      }        
    });
    
    return resultSubject.asObservable();
  }

  public LogOn(login:string, password:string):Observable<StatusMsg>{
    var resultSubject = new AsyncSubject<StatusMsg>();
    this.SetAuthorizationData(login, password);
    this.GetCurrentUserFromServer()
    .pipe(takeUntil(this.unsubscriptionSubj))    
    .subscribe({
      next: (response)=> { 
        var user:User = new User();
        if (response.isSuccess === false) {
          this.SendMsgStatusMessage(resultSubject, false, `Ошибка при получении данных c сервера: ${response.errorText}`);
        }
        else{
          user = response?.data ?? new User();
          if(this.IsAuthorized(user)){
            this.SendMsgStatusMessage(resultSubject, true, `С возвращением, ${user.login}`);
          }
          else{
            this.SendMsgStatusMessage(resultSubject, true, `Добро пожаловать, гость`);
          }
          this.SetCurrentUser(user);
        }          
        
      },
      error:(err)=> { this.SendMsgStatusMessage(resultSubject, false, `Ошибка при получении данных c сервера: ${err.message}`)}
    });

    return resultSubject.asObservable();
  }

  private IsAuthorized(user:User|null|undefined):boolean{
    return user !== null 
    && user !== undefined
    && user?.login !== undefined
    && user?.login !== null
    && user?.login !== "" 
    && user?.permissions != null
    && user?.permissions?.length > 0
  }

  public UserIsAuthorized():Observable<boolean>{
    return this.GetCurrentUser().pipe(map(user=> this.IsAuthorized(user)));
  }

  public LogOut(){
    var emptyUser = new User();
    this.SetCurrentUser(emptyUser);
  }

  private SendMsgStatusMessage(o$:AsyncSubject<StatusMsg>, status: boolean, message: string){
    var msg = new StatusMsg(status, message);
    o$.next(msg); 
    o$.complete();  
  }

  private SetCurrentUser(user: User): void 
  {
    this.userSubject?.next(user);
    this.SetAuthorizationData(user.login, user.password);
  }  

  private SetAuthorizationData(login:string, password:string){
    this.login = login;
    this.password = password;
  }

  ngOnDestroy(){
    this.unsubscriptionSubj.next();
    this.unsubscriptionSubj.complete();
  }
}
