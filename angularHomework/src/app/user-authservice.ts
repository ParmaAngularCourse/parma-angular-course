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
  private userKey = "currentUser";

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
    return this.getCurrentUser()?.login ?? "";
  }

  public authorise(login: string, password: string): Observable<boolean> {
    return this.http.get<UserInfo>(this.rootUrl + 'User', 
    {params: new HttpParams().set("login", login).append("pass", password)}).pipe(
      tap(value => {
        this.CurrentUser = value;
        localStorage.setItem(this.userKey, JSON.stringify(value))
      }),
      map(value => value != null)
    );
  }

  public getCurrentUser(): UserInfo | null {
    if (!this.CurrentUser) {
      let info = localStorage.getItem(this.userKey);
      this.CurrentUser = info != null ? JSON.parse(info) : null;
    }
    return this.CurrentUser;
  }

  public logOut() {
    this.CurrentUser = null;
    localStorage.removeItem(this.userKey);  }

  public changeUserInfo(newUserInfo: UserInfo): Observable<boolean> {
    return this.http.post<boolean>(this.rootUrl + 'User', newUserInfo).pipe(
      tap(isOk => {
        if (isOk) {
          this.CurrentUser = newUserInfo;
          localStorage.setItem(this.userKey, JSON.stringify(newUserInfo))
        }
      }));
  }

  public isAuthorised(): boolean {   
    return this.getCurrentUser() != null;
  }
}
