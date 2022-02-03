import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions'
import { PostObj } from '../../all-posts/post-types';


export const postFeatureKey = 'post';

export interface PostState {
  posts: PostObj[]
}

export const initialState: PostState = {
  posts: []
};

const postsReducer = createReducer(
  initialState,
  on(fromActions.actionLoadPosts, (state) => ({...state})),
  on(fromActions.actionPostsSuccess, (state, { posts }) => ({...state, posts: posts}))
);

export function reducer(state: PostState | undefined, action: Action): PostState {
  return postsReducer(state, action);
}

