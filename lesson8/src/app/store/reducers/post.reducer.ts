import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions'
import { PostObj } from '../../all-posts/post-types';


export const postFeatureKey = 'post';

export interface PostState {
  posts?: PostObj[]
}

export const initialState: PostState = { };

const postsReducer = createReducer(
  initialState,
  //on(fromActions.actionLoadPosts, (state) => ({...state})), // Не нужен т.к. обрабатывается в effects
  on(fromActions.actionPostsSuccess, (state, { posts }) => ({...state, posts: posts})),
  on(fromActions.actionEditPostSuccess, (state, { editPost }) => ({
    ...state,
    posts: state.posts?.map(
      _post => {
        if (_post.id === editPost.id) {
          return {
            id: editPost.id,
            date: editPost.date,
            isSelected: editPost.isSelected,
            postType: editPost.postType,
            text: editPost.text,
            title: editPost.title
          };
        }
        else {
          return _post;
        }
      }
    )
  }))
);

export function reducer(state: PostState | undefined, action: Action): PostState {
  return postsReducer(state, action);
}

