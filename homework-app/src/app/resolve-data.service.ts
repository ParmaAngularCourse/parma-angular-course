import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveDataService implements Resolve<any[]> {

  constructor(private usersService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.usersService.getAuthorizedUser();    
  }
}