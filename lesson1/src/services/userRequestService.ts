import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';
import { API_USER_URL } from 'src/api';
import { User } from 'src/app/auth-service.service';

@Injectable({ providedIn: 'root' })
export class UserRequestService {
  constructor(private readonly http: HttpClient) {
    this.Init();
  }
  private userSubject?: BehaviorSubject<User>;

  public Init() {
    if (!this.userSubject) {
      this.userSubject = new BehaviorSubject<User>({} as User);

      this.http
        .get<userObj>(API_USER_URL, {
          observe: 'body',
          responseType: 'json',
        })
        .pipe(
          map((x) => {
            const user = {
              login: x.login,
              password: x.password,
              name: x.name,
              email: x.email,
              admin: x.admin,
              surname: x.surname,
            } as User;
            return user;
          })
        )
        .subscribe((value) => this.userSubject?.next(value));
    }
  }

  public Get(): Observable<User> {
    return this.userSubject!.asObservable();
  }

  public Update(item: User) {
    const body = {
      login: item.login,
      password: item.password,
      name: item.name,
      surname: item.surname,
      email: item.email,
      admin: item?.admin ?? false,
    };
    this.http.put(API_USER_URL, {
      body: body,
      responseType: 'text',
    }).subscribe();
    this.userSubject?.next(item);
  }
}

type userObj = {
  login: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  admin: boolean;
};
