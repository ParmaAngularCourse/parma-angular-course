import { Injectable } from '@angular/core';
import { currentUser } from './user-types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getCurrentUserName() {
    return currentUser.name;
  }
  isCurrentUserAdmin() {
    return currentUser.isAdmin;
  }
}
