import { ActionReducerMap } from '@ngrx/store';
import { NewsPost } from 'src/models/NewsPost';
import * as fromReducers from './posts.reducer';

export interface State {
  news: fromReducers.NewsState;
}

export const reducers: ActionReducerMap<State> = {
  news: fromReducers.reducer,
};
