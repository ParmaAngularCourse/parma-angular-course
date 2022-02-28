import { Injectable } from '@angular/core';
import { UserHasPemission } from 'src/models/userPermissions';
import { UserService } from 'src/services/userService';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private user!: User | null;
  constructor(private userService: UserService) {}

  IsLoggedIn(): boolean {
    console.log(this.user);
    return !!this.user && !!this.user?.login;
  }

  public AuthString(): string {
    return 'my-auth-str';
  }

  public IsUserAdmin(): boolean {
    return this.user?.admin ?? UserHasPemission;
  }

  public LogIn(login: string, password: string): boolean {
    this.userService.GetAll().subscribe({
      next: (data) => {
        this.user = data;
      },
    });
    if (this.user?.login === login && this.user?.password === password) {
      return true;
    } else this.user = null;

    return false;
  }

  public LogOut() {
    this.user = {} as User;
  }

  public GetUserData(): User | null {
    return this.user;
  }

  public Update(user:User){
    this.userService.Update(user);
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
