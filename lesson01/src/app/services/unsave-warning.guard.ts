import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {PersonComponent} from "../person/person.component";
import {NewsItemModalReactiveComponent} from "../news/news-item-modal-reactive/news-item-modal-reactive.component";

@Injectable({
  providedIn: 'root'
})
export class UnsaveWarningGuard implements CanDeactivate<PersonComponent | NewsItemModalReactiveComponent> {
  canDeactivate(
    component: PersonComponent | NewsItemModalReactiveComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('canDeactivate');

    if(component instanceof PersonComponent)
    {
      if (!(component as PersonComponent).personFormGroup.pristine){
        return confirm("Покинуть страницу?");
      }
    }

    /*if(component instanceof NewsItemModalReactiveComponent)
    {
      if (!(component as NewsItemModalReactiveComponent).newsItemFormGroup.pristine){
        return confirm("Покинуть страницу?");
      }
    }*/

    return true;
  }
}
