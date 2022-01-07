import { Injectable } from '@angular/core';
import { UserHasPemission } from 'src/models/userPermissions';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {

  public AuthString(): string {
    return 'my-auth-str';
  }

  public IsUserAdmin(): boolean {
    return UserHasPemission;
  }
}
