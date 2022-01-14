import { Injectable, Pipe } from '@angular/core';
import { AsyncSubject, first, map, Observable, single, BehaviorSubject } from 'rxjs';
import { UserType, PermissionUser } from './all-posts/users';
import { HttpClient, HttpParams } from '@angular/common/http';

type dateUserType = {
  name: string,
  permissions: PermissionUser[]
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  userCurrent: UserType = {name: "user1", permissions: []};

  private userSubject: BehaviorSubject<UserType>= new BehaviorSubject<UserType>({name: "", permissions:[]});
  constructor(private httpClient: HttpClient) {
    this.loadUser(this.userCurrent.name);
   }

  public getUserObserverble(): Observable<UserType> {
    return this.userSubject.asObservable();
  }
  public loadUser(userName: string) {
    this.httpClient.get<dateUserType>("/UserInfo/GetUserInfoByName", { params: {name: userName}})
      .pipe(
        map(item => this.mapToUserType(item))
      )
      .subscribe((data) =>
      {
        this.userCurrent = data;
        this.userSubject.next(data);
      });
  }

  private mapToUserType(item: dateUserType): UserType {

    let result = {
      name: item.name,
      permissions: [...item.permissions]
    } as UserType;
    return result;
  }
}
