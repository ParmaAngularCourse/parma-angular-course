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
            return of(fromActions.editNewsItemError({ error: err}));
          })
        );
      })
    )
  )

  editNewsItemSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.editNewsItemSuccess),
      map(() => fromActions.addSnackBarMessage({ message: "Новость отредактирована"}))
    )
  )

  editNewsItemReset$ = createEffect(()=>
    this.actions$.pipe(
      ofType(fromActions.editNewsItemReset),
      map(() => fromActions.addSnackBarMessage({message: "Редактирование новости отменено"}))
    )
  )

  editNewsItemError$ = createEffect(()=>
    this.actions$.pipe(
      ofType(fromActions.editNewsItemError),
      map(action => fromActions.addSnackBarMessage({message: "Ошибка операции: " + action.error.message}))
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
            return of(fromActions.addNewsItemError({ error: err}))
          })
        )
      })
    )
  )

  addNewsItemSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addNewsItemSuccess),
      map(() => fromActions.addSnackBarMessage({ message: "Новость добавлена"}))
    )
  )

  addNewsItemReset$ = createEffect( () =>
    this.actions$.pipe(
      ofType(fromActions.addNewsItemReset),
      map(() => fromActions.addSnackBarMessage({ message: "Добавление новости отменено" }))
    )
  )

  addNewsItemError$ = createEffect(()=>
    this.actions$.pipe(
      ofType(fromActions.addNewsItemError),
      map(action => fromActions.addSnackBarMessage({message: "Ошибка операции: " + action.error.message }))
    )
  )

  removeNewsItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.removeNewsItem),
      switchMap((action)=> {
        return this._newsService.removeNewsItem(action.id).pipe(
          map((_id) => {
            return fromActions.removeNewsItemSuccess({ id: _id});
          }),
          catchError(err => {
            return of(fromActions.removeNewsItemError({error: err}))
          })
        )
      })
    )
  )

  removeNewsItemSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.removeNewsItemSuccess),
      map(() => fromActions.addSnackBarMessage({ message: "Новость удалена"}))
    )
  )

  removeNewsItemError$ = createEffect(()=>
    this.actions$.pipe(
      ofType(fromActions.removeNewsItemError),
      map(action => fromActions.addSnackBarMessage({message: "Ошибка операции: " + action.error.message}))
    )
  )
}
