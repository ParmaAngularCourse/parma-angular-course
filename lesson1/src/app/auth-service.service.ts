import { Injectable } from '@angular/core';
import { UserRightsObj } from './news/news-types';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  private name = "";
  private surname = "";
  private email = "";

  getName(){
    return this.name;
  }
  getSurname(){
    return this.surname;
  }
  getEmail(){
    return this.email;
  }


  setName(value: string){
    this.name = value;
  }
  setSurname(value: string){
    this.surname = value;
  }
  setEmail(value: string){
    this.email = value;
  }







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


  getUserRights() : UserRightsObj{
    return {isUsercanDeleteNews: true, isUsercanEditNews: true};
  }


}
