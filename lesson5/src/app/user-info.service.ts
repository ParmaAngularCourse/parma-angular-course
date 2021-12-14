import { Injectable, Pipe } from '@angular/core';
import { AsyncSubject, first, map, Observable, single, BehaviorSubject } from 'rxjs';
import { UserType, PermissionUser } from './all-posts/users';
import { HttpClient } from '@angular/common/http';

type dateUserType = {
  name: string,
  permissions: PermissionUser[]
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private userSubject: BehaviorSubject<UserType>;
  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<UserType>({name: "", permissions:[]});
   }

  public getUser(): Observable<UserType> {
    this.httpClient.get<dateUserType>("/UserInfo/GetUserInfo")
    .pipe(
      map(item => this.mapToUserType(item))
    )
    .subscribe((data) => this.userSubject.next(data));

    return this.userSubject.asObservable();
  }
  private mapToUserType(item: dateUserType): UserType {

    let result = {
      name: item.name,
      permissions: [...item.permissions]
    } as UserType;
    return result;
  }
}
