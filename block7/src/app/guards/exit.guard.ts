import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ICanDeactivateComponent } from 'src/model/ICanDeactivateComponent';

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<ICanDeactivateComponent> {
  canDeactivate(
    component: ICanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
