import { Injectable } from '@angular/core';
import { UserHasPemission } from 'src/models/userPermissions';
import { UserService } from 'src/services/userService';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user!: User | null;
  private subscrition!: Subscription;

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.subscrition = this.userService.GetAll().subscribe({
      next: (data) => {
        this.user = data;

        if (data.admin) this.cookieService.set('IsLoggedIn', 'true');
      },
    });
  }

  IsLoggedIn(): boolean {
    const hasSomeValueInCookie = this.cookieService.get('IsLoggedIn');
    return !!hasSomeValueInCookie;
  }

  public AuthString(): string {
    return 'my-auth-str';
  }

  public IsUserAdmin(): boolean {
    return this.user?.admin ?? UserHasPemission;
  }

  public LogIn(login: string, password: string): boolean {
    this.subscrition = this.userService.Login(login, password).subscribe({
      next: (data) => {
        this.user = data;
        this.cookieService.set('IsLoggedIn', 'true');
      },
    });

    return false;
  }

  public LogOut() {
    console.log(JSON.stringify(this.user));
    this.user!.admin = false;
    this.Update(this.user!);
    this.cookieService.deleteAll('IsLoggedIn');
  }

  public GetUserData(): Observable<User | null> {
    return this.userService.GetAll();
  }

  public Update(user: User) {
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
