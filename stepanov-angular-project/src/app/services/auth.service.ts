import { Injectable } from '@angular/core';
import { User, UserRights } from '../news/i-user-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getCurrentUser() : User {
    return new User('admin', 'test', 'empty', 'Bearer TestUserTokenBlaBlaBla', UserRights.Admin);
  }
}
