import {Injectable} from "@angular/core";
import {map, switchMap} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {NewsService} from "../../news/services/news.service";
import {NewsItemModel} from "../../news/news-types";
import * as fromActions from '../actions'

@Injectable()
export class NewsEffects {
  constructor(private _newsService: NewsService,
              private actions$: Actions) {
  }

  getNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadNews),
      switchMap((action) =>
        this._newsService.getNews(action.searchVal, action.selectedTag).pipe(
          map((_newsItems: NewsItemModel[]) => {
            return fromActions.loadNewsSuccess({ news: _newsItems })
          })
        )
      )
    )
  )
}
