import { Injectable } from '@angular/core';
import { UserPermissions } from './model/userPermissions';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public getUserPermissions(): UserPermissions {
    return {
      allowSave: true,
      allowDelete: true
    }
  }

  public getUserAuthorizationData(): string {
    return "test_authorisation data"
  }
}
