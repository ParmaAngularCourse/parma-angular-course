import { Injectable, Pipe } from '@angular/core';
import {
  AsyncSubject,
  first,
  map,
  Observable,
  single,
  BehaviorSubject,
} from 'rxjs';
import { UserType, PermissionUser } from './all-posts/users';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

type dataUserType = {
  email: string;
  surname: string;
  name: string;
  login: string;
  permissions: PermissionUser[];
};

type dataAuth = {
  access_token: string;
  username: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private authCookieName: string = 'Authorization';
  private userNameCookie: string = 'username';

  dataAuth: dataAuth | null = null;
  userCurrent: UserType | null = null;

  userSubject: BehaviorSubject<UserType | null> =
    new BehaviorSubject<UserType | null>(null);

  errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.GetCookieAuth();
  }

  private GetCookieAuth() {
    if (this.cookieService) {
      let access_token = this.cookieService.get(this.authCookieName);
      let username = this.cookieService.get(this.userNameCookie);
      if (access_token && username) {
        this.dataAuth = { access_token: access_token, username: username };
        //this.loadUser(this.dataAuth.username); // Выходит циклическая зависимость
      }
    }
  }

  private SetCookieAuth() {
    if (this.cookieService && this.dataAuth) {
      this.cookieService.set(this.authCookieName, this.dataAuth.access_token);
      this.cookieService.set(this.userNameCookie, this.dataAuth.username);
    }
  }

  private ClearAllCookie() {
    if (this.cookieService) {
      this.cookieService.deleteAll();
    }
  }

  public getUserObserverble(): Observable<UserType | null> {
    return this.userSubject.asObservable();
  }

  public loadUser(login: string) {
    this.httpClient
      .post<dataUserType>(
        '/UserInfo/GetUserInfoByLogin',
        {},
        {
          params: {
            login: login,
          },
        }
      )
      .pipe(map((item) => this.mapToUserType(item)))
      .subscribe((data) => {
        this.userCurrent = data;
        this.userSubject.next(data);
      });
  }

  public updateUser(user: UserType) {
    this.httpClient
      .post<UserType>(
        '/UserInfo/UpdateUserInfoByLogin',
        this.mapToDataUserType(user)
      )
      .subscribe({
        next: (_) => {},
        error: (error: HttpErrorResponse) =>
          console.log(error.status + ' ' + error.message),
        complete: () => {
          this.loadUser(user.login);
          console.log('update userInfo complete');
        },
      });
  }

  private mapToUserType(item: dataUserType): UserType {
    let result = {
      name: item.name,
      surname: item.surname,
      email: item.email,
      login: item.login,
      permissions: [...item.permissions],
    } as UserType;
    return result;
  }

  private mapToDataUserType(item: UserType): dataUserType {
    let result = {
      name: item.name,
      surname: item.surname,
      email: item.email,
      login: item.login,
      permissions: [...item.permissions],
    } as dataUserType;
    return result;
  }

  public isAuth(): boolean {
    return this.userCurrent !== null;
  }

  public authenticate(login: string, password: string) {
    this.httpClient
      .post(
        '/token',
        {},
        {
          params: {
            login: login,
            password: password,
          },
        }
      )
      .subscribe({
        next: (value) => {
          let authData = value as dataAuth;
          if (authData !== null) {
            this.dataAuth = authData;
            this.SetCookieAuth();
            this.loadUser(authData.username);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.errorSubject.next('Не верное имя пользователя или пароль');
        },
        complete: () => {},
      });
  }

  public logout() {
    this.userCurrent = null;
    this.dataAuth = null;
    this.ClearAllCookie();
    this.userSubject.next(null);
  }
}
