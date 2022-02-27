import { Injectable } from '@angular/core';
import { UserHasPemission } from 'src/models/userPermissions';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private user: User | null = null;

  constructor() {
    this.user = {
      login: 'a',
      password: 'a',
      name: 'Максим',
      surname: 'Гильман',
      email: 'mail@mail.ru',
    } as User;
  }
  IsLoggedIn() {
    console.log(this.user);
    return !!this.user;
  }

  public AuthString(): string {
    return 'my-auth-str';
  }

  public IsUserAdmin(): boolean {
    return this.user?.admin ?? UserHasPemission;
  }

  public LogIn(login: string, password: string): boolean {
    if (this.user) {
      this.user.login = login;
      this.user.password = password;
    } else
      this.user = {
        login: login,
        password: password,
      } as User;

    console.log(this.user);
    return true;
  }

  public LogOut() {
    this.user = null;
  }

  public GetUserData(): User | null {
    return this.user;
  }
}

export interface User {
  login: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  admin: boolean;
}
