import {Injectable} from "@angular/core";
import {catchError, map, switchMap} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {NewsService} from "../../news/services/news.service";
import {NewsItem} from "../../news/news-types";
import * as fromActions from '../actions'
import {of} from "rxjs";

@Injectable()
export class NewsEffects {
  constructor(private _newsService: NewsService,
              private actions$: Actions) {
  }

  getNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadNews),
      switchMap((action) => {
        return this._newsService.getNews(action.searchVal, action.selectedTag).pipe(
          map((_newsItems: NewsItem[]) => {
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
            return of(fromActions.editNewsItemError(err));
          })
        );
      })
    )
  )

  addNewsItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addNewsItem),
      switchMap((action) => {
        return this._newsService.addNewsItem(action.newsItem).pipe(
          map(item => {
            return fromActions.addNewsItemSuccess({ newsItem: item })
          }),
          catchError((err) => {
            return of(fromActions.addNewsItemError(err))
          })
        )
      })
    )
  )

  removeNewsItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.removeNewsItem),
      switchMap((action)=> {
        return this._newsService.removeNewsItem(action.id).pipe(
          map(() => {
            return fromActions.removeNewsItemSuccess();
          }),
          catchError(err => {
            return of(fromActions.removeNewsItemError(err))
          })
        )
      })
    )
  )
}
