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
