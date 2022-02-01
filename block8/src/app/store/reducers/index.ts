import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'
import * as fromNews from './news.reducers'
import * as fromMain from './main.reducers'
import { routerReducer, RouterReducerState } from '@ngrx/router-store'
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { RouterStateSerializer } from '@ngrx/router-store';


export interface State{
    newsObjects: fromNews.NewsState,
    mainObjects: fromMain.MainState,
    router: RouterReducerState
}

export const reducers: ActionReducerMap<State> = {
    newsObjects: fromNews.reducer,
    mainObjects: fromMain.reducer,
    router: routerReducer
}

export const selectNewsState = createFeatureSelector<fromNews.NewsState>('newsObjects');

export interface RouterState{
    url: string,
    queryParams: Params,
    params: Params
}

@Injectable()
export class CustomRouterStateSerializer implements  RouterStateSerializer<RouterState> {
    serialize(routerState: RouterStateSnapshot): RouterState {
      const {
        url,
        root: { queryParams },
      } = routerState;
  
      let route: ActivatedRouteSnapshot = routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const { params } = route;
  
      return { url, queryParams, params};
    }
  }