import { createAction, props } from '@ngrx/store';
import { PostObj } from '../../all-posts/post-types';

export const actionLoadPosts = createAction(
  '[Post] Action Posts'
);

export const actionPostsSuccess = createAction(
  '[Post] Action Posts Success',
  props<{ posts: PostObj[] }>()
);

export const actionPostsFailure = createAction(
  '[Post] Action Posts Failure',
  props<{ error: string }>()
);

export const actionEditPost = createAction(
  '[Post] Action Edit Post',
  props<{ editPost: PostObj}>()
);

export const actionEditPostSuccess = createAction(
  '[Post] Action Edit Post Success',
  props<{ editPost: PostObj}>()
);

export const actionEditPostFailure = createAction(
  '[Post] Action Edit Post Failure',
  props<{ error: string }>()
);

export const actionEditPostCancel = createAction(
  '[Post] Action Edit Post Cancel'
);

export const actionPostSelected = createAction(
  '[Post] Action Post Selected',
  props<{ selectedPost: PostObj}>()
);
