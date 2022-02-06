import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EditDialogComponent } from '../../all-posts/edit-dialog/edit-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class EditPostGuard implements CanDeactivate<EditDialogComponent> {
  canDeactivate(
    component: EditDialogComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate();
  }
}
