import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from './model/user-info';
import { UserPermissions } from './model/userPermissions';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private rootUrl = environment.host;

  private CurrentUser: UserInfo | null = null;

  constructor(private http: HttpClient) { }

  public getUserPermissions(): UserPermissions {

    if (this.isAuthorised())
    return {
      allowSave: true,
      allowDelete: true
    }

    return {
      allowSave: false,
      allowDelete: false
    }
  }

  public getUserAuthorizationData(): string {
    return this.CurrentUser?.login ?? "";
  }

  public authorise(login: string, password: string): Observable<boolean> {
    return this.http.get<UserInfo>(this.rootUrl + 'User', 
    {params: new HttpParams().set("login", login).append("pass", password)}).pipe(
      tap(value => this.CurrentUser = value),
      map(value => value != null)
    );
  }

  public getCurrentUser(): UserInfo | null {
    return this.CurrentUser;
  }

  public logOut() {
    this.CurrentUser = null;
  }

  public changeUserInfo(newUserInfo: UserInfo): Observable<boolean> {
    return this.http.post<boolean>(this.rootUrl + 'User', newUserInfo).pipe(
      tap(isOk => {
        if (isOk) {
          this.CurrentUser = newUserInfo;
        }
      }));
  }

  public isAuthorised(): boolean {
    return this.CurrentUser != null;
  }
}
