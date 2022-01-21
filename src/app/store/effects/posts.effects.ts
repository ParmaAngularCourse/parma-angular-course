import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { NewsService } from "../../news.service";
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { Report } from "../../news/news-types";

@Injectable()
export class PostEffects {
  constructor(private _postsService: NewsService, private actions$: Actions, private store$: Store<fromReducers.State>) { }

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadPosts),
      switchMap(() => {
        return this._postsService.getPosts().pipe(
          map((_postObjs: Report[]) => {
            return fromActions.loadPostsSuccess({ posts: _postObjs });
          }))
      })))

  updateReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateReport),
      switchMap(action => {
        return this._postsService.updateReport(action.report).pipe(
          map(() => {
            return fromActions.updateReportSuccess(action);
          }),
          catchError(() => { return [fromActions.updateReportError()] })
        )
      })))

  updateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateReportSuccess),
      map(action => {
        return fromActions.addSnackBarMessage({ message: "Success!" })
      })))

  updateError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateReportError),
      map(() => {
        return fromActions.addSnackBarMessage({ message: "Error!" })
      })))
}
