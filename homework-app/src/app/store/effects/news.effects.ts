import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import { News } from "../../news-list/news-types";
import { NewsService } from "../../news.service";
import * as fromActions from  '../actions';
import * as fromReducers from '../reducers';

@Injectable()
export class NewsEffects {
    constructor(private _newsService: NewsService, private actions$: Actions, private store$: Store<fromReducers.State>) {}

    getNews$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromActions.loadNews),
            switchMap(() => 
                {
                    return this._newsService.getNewsList().pipe(
                        map((_newsObjs: News[]) => {                    
                            return fromActions.loadNewsSuccess({ newsList: _newsObjs });
                        })
                    )
                }
            )
        )
    )

    editNews$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.editNews),
            switchMap(action => {
                return this._newsService.updateNews(action.news).pipe(
                    map((_newsObj: News) => {                    
                        return fromActions.editNewsSuccess({ news: _newsObj });
                    })
                )
            })
        )
    )
}