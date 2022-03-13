import { Action, createReducer, on } from '@ngrx/store';
import { NewsPost } from 'src/models/NewsPost';
import * as fromActions from '../actions';

export interface NewsState {
  news?: NewsPost[];
}

const InitialState: NewsState = {};

const postReducer = createReducer(
  InitialState,
  on(fromActions.loadPostSuccess, (state, { news }) => ({
    ...state,
    news: news,
  })),

  on(fromActions.addNewsPostSuccess, (state, { post }) => ({
    ...state,
    news: state.news?.concat(post).map((x) => x),
  }))
);

export function reducer(
  state: NewsState | undefined,
  action: Action
): NewsState {
  return postReducer(state, action);
}
