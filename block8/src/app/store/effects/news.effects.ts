import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { NewsService } from "../../service/news.service";
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

@Injectable()
export class NewsEffects{
    constructor(private _newsService: NewsService, private actions$:Actions, private store$: Store<fromReducers.State>){
        
    }

    getNews$ = createEffect(()=> this.actions$
    .pipe(
        ofType(fromActions.loadNews),
        map((action) => action.filter),
        withLatestFrom(this.store$.pipe(select(fromSelectors.selectNews))),
        switchMap(([params, _newsObjs]) => 
        {
            if(JSON.stringify(params) === JSON.stringify(_newsObjs.filter) && _newsObjs.news){
                return [fromActions.loadNewsSuccess({ newsData: _newsObjs.news, filter: params})]
            } 
            return this._newsService.getNewsList(params)
                .pipe(                        
                    map((response) =>
                    {
                        if (response.isSuccess === false) {
                            return fromActions.loadNewsError({
                                error: `При попытке изменить список новостей возникла ошибка: ${response.errorText}`
                            });            
                        }
                        else{
                            var newsDate = this._newsService.CreateNewsList(response.data);
                            return fromActions.loadNewsSuccess({ newsData: newsDate, filter: params})
                        }                        
                    }),                    
                    catchError((err) => of(fromActions.loadNewsError({
                        error: `При попытке изменить список новостей возникла ошибка: ${err}`
                    })))
                )
        })
    ) 
    )

    addNews$ = createEffect(()=> this.actions$
    .pipe(
        ofType(fromActions.editNews),
        //withLatestFrom(this.store$.pipe(select(fromSelectors.selectNews))),
        switchMap(action => {
            return this._newsService.addNews(action.editNews)
                    .pipe(
                        map(response=>{
                            if (response.isSuccess === false) {
                                return fromActions.editNewsError({
                                    error: `При попытке изменить список новостей возникла ошибка: ${response.errorText}`
                                });            
                            }
                            else{
                                if(response?.data){
                                    if(this._newsService.isExistingNewsInStore(response.data)/*storeData.news.findIndex(x=>x.id === response.data?.id) >= 0 */){
                                        return fromActions.editNewsSuccess(action)
                                    }
                                    else{
                                        return fromActions.addNewsSuccess(action)
                                    } 
                                }
                                else{
                                    return fromActions.editNewsError({
                                        error: `При попытке изменить список получены пустые данные`
                                    });
                                }
                            }
                        }
                        ),
                        catchError((err) => of(fromActions.editNewsError({
                            error: `При попытке изменить список новостей возникла ошибка: ${err}`
                        })))
                    )            
        })
    )
    )
}