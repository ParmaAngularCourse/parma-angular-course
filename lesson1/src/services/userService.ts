import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/auth-service.service';
import { UserRequestService } from './userRequestService';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly requestService: UserRequestService) {}

  public GetAll(): Observable<User> {
    return this.requestService.Get();
  }

  public Login(login: string, password: string): Observable<boolean> {
    return this.GetAll().pipe(
      map((x) => {
        return x.login == login && x.password === password;
      })
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
  }
}
