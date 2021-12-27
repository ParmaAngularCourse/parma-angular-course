import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPosts from './posts.reducers';
import * as fromMain from './main.reducers';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

export interface State {
    postObjects: fromPosts.PostState,
    mainObjects: fromMain.MainState,
    router: RouterReducerState
}

export const reducers: ActionReducerMap<State> = {
    postObjects: fromPosts.reducer,
    mainObjects: fromMain.reducer,
    router: routerReducer
}

export const selectPostsState = createFeatureSelector<fromPosts.PostState>('postObjects');
export const getRouterState = createFeatureSelector<RouterReducerState<RouterState>>('router');

export interface RouterState {
    url: string;
    queryParams: Params;
    params: Params;
}

@Injectable()
export class CustomRouterStateSerializer implements RouterStateSerializer<RouterState> {
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
  
      return { url, queryParams, params };
    }
  }
  