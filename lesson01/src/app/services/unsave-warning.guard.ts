import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
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
        return confirm("Имеются несохраненные данные, вы действительно хотите покинуть страницу?");
      }
    }

    if(component instanceof NewsItemModalReactiveComponent)
    {
      if (!(component as NewsItemModalReactiveComponent).newsItemFormGroup.pristine){
        return confirm("Имеются несохраненные данные, вы действительно хотите закрыть окно?");
      }
    }

    return true;
  }
}
