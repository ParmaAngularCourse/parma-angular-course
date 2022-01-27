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

type dateUserType = {
  email: string;
  surname: string;
  name: string;
  login: string;
  permissions: PermissionUser[];
};

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  userCurrent: UserType | null = null/* {
    name: '',
    surname: '',
    email: '',
    login: 'user1',
    permissions: [],
  }*/;

  private userSubject: BehaviorSubject<UserType | null> =
    new BehaviorSubject<UserType | null>(null/*{
      name: '',
      surname: '',
      email: '',
      login: '',
      permissions: [],
    }*/);
  constructor(private httpClient: HttpClient) {
    //this.loadUser(this.userCurrent.login);
  }

  public getUserObserverble(): Observable<UserType | null> {
    return this.userSubject.asObservable();
  }
  public loadUser(user: UserType) {
    this.httpClient
      .post<dateUserType>('/UserInfo/UpdateUserInfoByLogin', this.mapToDataUserType(user))
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
          this.loadUser(user);
          console.log('update userInfo complete');
        },
      });
  }

  private mapToUserType(item: dateUserType): UserType {
    let result = {
      name: item.name,
      surname: item.surname,
      email: item.email,
      login: item.login,
      permissions: [...item.permissions],
    } as UserType;
    return result;
  }

  private mapToDataUserType(item: UserType): dateUserType {
    let result = {
      name: item.name,
      surname: item.surname,
      email: item.email,
      login: item.login,
      permissions: [...item.permissions],
    } as dateUserType;
    return result;
  }
}
