import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromPostsReducer from './post.reducer';
import * as fromMainReducer from './main.reducer';
import { environment } from '../../../environments/environment.prod';


export interface State {
  postObjects: fromPostsReducer.PostState,
  mainObjects: fromMainReducer.MainState
}

export const reducers: ActionReducerMap<State> = {
  postObjects: fromPostsReducer.reducer,
  mainObjects: fromMainReducer.reducer
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
