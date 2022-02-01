import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { bufferCount, from, map, Observable, switchMap, toArray } from "rxjs";
import { News } from "src/model/News";
import { NewsService } from "../../service/news.service";
import * as fromActions from '../actions'

@Injectable()
export class NewsEffects{
    constructor(private _newsService: NewsService, private actions$:Actions){
        
    }

    @Effect()
    getNews$: Observable<Action> = this.actions$.pipe(
        ofType(fromActions.LOAD_NEWS),
        map((action: fromActions.LoadNews) => action.payload),
        switchMap((params) => this._newsService.getNewsList(params)
            .pipe(
                switchMap(value=> {
                    return from(value).pipe(
                    bufferCount(3),
                    toArray()
                    )
                }),            
                map((_newsObjs: News[][]) =>{ return new fromActions.LoadNewsSuccess(_newsObjs)
            })
        ))
    )
}