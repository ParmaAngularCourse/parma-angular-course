import {Injectable} from "@angular/core";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {NewsService} from "../../news/services/news.service";
import {NewsItemModel} from "../../news/news-types";
import * as fromActions from '../actions'
import * as fromReducers from '../reducers'
import {of} from "rxjs";

@Injectable()
export class NewsEffects {
  constructor(private _newsService: NewsService,
              private actions$: Actions,
              private store$: Store<fromReducers.State>) {
  }

  getNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadNews),
      switchMap((action) => {
        return this._newsService.getNews(action.searchVal, action.selectedTag).pipe(
          map((_newsItems: NewsItemModel[]) => {
            return fromActions.loadNewsSuccess({news: _newsItems})
          })
        );}
      )
    )
  )

  editNewsItem$ = createEffect( () =>
    this.actions$.pipe(
      ofType(fromActions.editNewsItem),
      switchMap((action) => {
        return this._newsService.editNewsItem(action.newsItem).pipe(
          map(item => {
            return fromActions.editNewsItemSuccess({ newsItem: item })
          }),
          catchError((err) => {
            return of(fromActions.editNewsItemReset());
          })
        );
      })
    )
  )
}
