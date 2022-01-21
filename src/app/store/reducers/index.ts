import { RouterState } from "@angular/router";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromPosts from "./posts.reducers";
import * as fromMain from "./main.reducers";

export interface State {
  postObjects: fromPosts.PostState,
  mainObjects: fromMain.MainState,
}

export const reducers: ActionReducerMap<State> = {
  postObjects: fromPosts.reducer,
  mainObjects: fromMain.reducer
}

export const selectPostsState = createFeatureSelector<fromPosts.PostState>('postObjects');
