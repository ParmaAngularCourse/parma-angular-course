import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService, User } from 'src/app/auth-service.service';
import { UserRequestService } from './userRequestService';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly requestService: UserRequestService,
    private cookieService: CookieService
  ) {}

  public GetAll(): Observable<User> {
    return this.requestService.Get();
  }

  public Login(login: string, password: string): Observable<User> {
    return this.GetAll().pipe(
      take(1),
      tap((x) => console.log(JSON.stringify(x))),
      map((x) => {
        if (x?.login === login && x?.password === password) {
          x.admin = true;
          return x;
        } else return {} as User;
      })
      // ,
      // tap((user) => {
      //   if (!!user  && Object.keys(user).length !== 0) this.Update(user);
      // }
      // )
    );
  }

  public IsAdmin(): Observable<boolean> {
    return this.GetAll().pipe(
      map((x) => {
        return x.admin;
      })
    );
  }

  public Update(item: User) {
    this.requestService.Update(item);
    if (!item?.admin) this.cookieService.deleteAll('IsLoggedIn');
  }
}
