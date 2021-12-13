import { Injectable } from '@angular/core';
import { UserType, PermissionUser } from './all-posts/users';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private user1: UserType = {
    name: 'User1',
    permissions:[ PermissionUser.view, PermissionUser.save, PermissionUser.delete]
  }

  private user2: UserType = {
      name: 'User2',
      permissions:[ PermissionUser.view]
  }
  constructor() { }

  public getUser(): UserType {
    return this.user1;
  }
}
