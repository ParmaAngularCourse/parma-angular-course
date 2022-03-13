import { Action, createReducer, on } from '@ngrx/store';
import { NewsPost } from 'src/models/NewsPost';
import * as fromActions from '../actions';

export interface NewsState {
  news: NewsPost[];
}

const InitialState: NewsState = {
  news: [],
};

const postReducer = createReducer(
  InitialState,
  on(fromActions.loadPost, (state) => ({ ...state })),
  on(fromActions.loadPostSuccess, (state, { news }) => ({
    ...state,
    news: news,
  }))
);

export function reducer(
  state: NewsState | undefined,
  action: Action
): NewsState {
  return postReducer(state, action);
}
