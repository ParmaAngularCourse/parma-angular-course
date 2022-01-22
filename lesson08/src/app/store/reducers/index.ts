import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";
import * as fromNews from './news.reducers'
import * as fromMain from './main.reducers'

export interface State {
  newsItems: fromNews.NewsState,
  mainObjects: fromMain.MainState
}

export const reducers: ActionReducerMap<State> = {
  newsItems: fromNews.reducer,
  mainObjects: fromMain.reducer
}

export const selectNewsState =  createFeatureSelector<fromNews.NewsState>('newsItems');
