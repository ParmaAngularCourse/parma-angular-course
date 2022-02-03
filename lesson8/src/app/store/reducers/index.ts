import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromPosts from './post.reducer';
import { environment } from '../../../environments/environment.prod';


export interface State {
  postObjects: fromPosts.PostState
}

export const reducers: ActionReducerMap<State> = {
  postObjects: fromPosts.reducer
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
