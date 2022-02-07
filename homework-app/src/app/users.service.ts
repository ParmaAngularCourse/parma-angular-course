import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private serverUrl: string  = 'http://localhost:3000';
  private currentUser: string = '';
  
  constructor(private http: HttpClient) {
  }

  public getCurrentUserName() {
    return this.currentUser;
  }
  public hasCurrentUserName() {
    return !!this.currentUser;
  }

  public isAuth(): Observable<boolean> {
    let params = new HttpParams()
      .set('login', this.currentUser);
    return this.http.get<boolean>(
      `${this.serverUrl}/api/isAuth`,
      { params: params }
      );
  }

  public login(login: string, password: string): Observable<any> {
    return this.http.post<any>(
        `${this.serverUrl}/api/login`,
        {
          login: login,
          password: password
        },
        { headers: new HttpHeaders().set("content-type","application/json") }
      ).pipe(
      map(value => {
        if (value)
          this.currentUser = login;
        return value;
      })
    );
  }

  public logout(): Observable<any> {
    return this.http.post<any>(
        `${this.serverUrl}/api/logout`,
        {
          login: this.currentUser
        },
        { headers: new HttpHeaders().set("content-type","application/json") }
      ).pipe(
      map(value => {
        if (value)
          this.currentUser = '';
        return value;
      })
    );
  }

  public getAuthorizedUser(): Observable<any> {
    return this.http.get<any>(
        `${this.serverUrl}/api/currentUser`)
      .pipe(
      map(value => {
        if (value)
          this.currentUser = value.login;
        return value;
      })
    );
  }

  public updateUserProfile(profileInfo: any): Observable<any> {
    return this.http.put<any>(
        `${this.serverUrl}/api/users`,
        profileInfo,
        { headers: new HttpHeaders().set("content-type","application/json") }
      );
  }
}
