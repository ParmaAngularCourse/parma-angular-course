import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './news/user-rights';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>({
     Name: "Petr", Rights: {CanDelete: true, CanSave: true } 
     });

  constructor() { }

  getCurrentUserOberverble(): Observable<User>{
    return this.userSubject.asObservable();
  }
}
