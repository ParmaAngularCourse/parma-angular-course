import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  private isAuthValue = false;

  isAuth(): boolean{
    return this.isAuthValue;
  }

  setAuth(isAuth: boolean){
    this.isAuthValue = isAuth;
  }

  login(userName: string, pass: string)
  {
    if(userName == '1' && pass == '2')
      this.setAuth(true);
  }

  logout()
  {
      this.setAuth(false);
  }

}
