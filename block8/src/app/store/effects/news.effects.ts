import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { catchError, concatMap, map, of, switchMap, withLatestFrom } from "rxjs";
import { NewsService } from "../../service/news.service";
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import { StatusMsg } from "../../../model/StatusMsg";

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
            if(JSON.stringify(params) === JSON.stringify(_newsObjs.filter) && _newsObjs){
                return [fromActions.loadNewsSuccess({ newsData: _newsObjs, filter: params})]
            } 
            return this._newsService.getNewsList(params)
                .pipe(                        
                    map((response) =>
                    {
                        if (response.isSuccess === false) {
                            return fromActions.loadNewsError({
                                error: `При попытке получить список новостей возникла ошибка: ${response.errorText}`
                            });            
                        }
                        else{
                            var newsDate = this._newsService.CreateNewsList(response.data);
                            return fromActions.loadNewsSuccess({ newsData: newsDate, filter: params})
                        }                        
                    }),                    
                    catchError((err) => of(fromActions.loadNewsError({
                        error: `При попытке получить список новостей возникла ошибка: ${err}`
                    })))
                )
        })
    ) 
    )

    addNews$ = createEffect(()=> this.actions$
    .pipe(
        ofType(fromActions.editNews),
        withLatestFrom(this.store$.pipe(select(fromSelectors.selectNews))),
        switchMap(([action, news]) => {
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
                                    var newsFromServer = this._newsService.NewsDataToNews(response.data);
                                    if(news.findIndex(x=>x.id == newsFromServer.id) >=0){
                                        return fromActions.editNewsSuccess({editNews: newsFromServer})
                                    }
                                    else{
                                        return fromActions.addNewsSuccess({editNews: newsFromServer})
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

    deleteNews$ = createEffect(()=> this.actions$
    .pipe(
        ofType(fromActions.deleteNews),
        concatMap(action => {
            return this._newsService.deleteNews(action.deletingNews)
                    .pipe(
                        map(response=>{
                            if (response.isSuccess === false) {
                                return fromActions.deleteNewsError({
                                    error: `При попытке удалить новость возникла ошибка: ${response.errorText}`
                                });            
                            }
                            else{
                                //var delNewsindex = this._newsService.GetNewsIndex(action.deletingNews);
                                return fromActions.deleteNewsSuccess({ deletingNewsId: action.deletingNews.id});
                            }
                        }
                        ),
                        catchError((err) => of(fromActions.editNewsError({
                            error: `При попытке удалить новость возникла ошибка: ${err}`
                        })))
                    )            
        })
    )
    )

    loadNewsError$ = createEffect(()=>
    this.actions$.pipe(
        ofType(fromActions.loadNewsError),
        map(action=>{
            console.log(action.error);
            return fromActions.addSnackBarMessage({statusMessage: new StatusMsg(false, action.error)})
        })
    ))

    addNewsSuccess$ = createEffect(()=>
    this.actions$.pipe(
        ofType(fromActions.addNewsSuccess),
        map(action=>{
            return fromActions.addSnackBarMessage({statusMessage: new StatusMsg(true, 'Новость успешно добавлена')})
        })
    ))

    editNewsSuccess$ = createEffect(()=>
    this.actions$.pipe(
        ofType(fromActions.editNewsSuccess),
        map(action=>{
            return fromActions.addSnackBarMessage({statusMessage: new StatusMsg(true, 'Новость успешно отредактирована')})
        })
    ))

    editNewsError$ = createEffect(()=>
    this.actions$.pipe(
        ofType(fromActions.editNewsError),
        map(action=>{
            console.log(action.error);
            return fromActions.addSnackBarMessage({statusMessage: new StatusMsg(false, action.error)});
        })
    ))

    deleteNewsSuccess$ = createEffect(()=>
    this.actions$.pipe(
        ofType(fromActions.deleteNewsSuccess),
        map(action=>{
            return fromActions.addSnackBarMessage({statusMessage: new StatusMsg(true, 'Новость успешно удалена')})
        })
    ))

    deleteNewsError$ = createEffect(()=>
    this.actions$.pipe(
        ofType(fromActions.deleteNewsError),
        map(action=>{
            console.log(action.error);
            return fromActions.addSnackBarMessage({statusMessage: new StatusMsg(false, action.error)});
        })
    ))
}