import { createAction, props } from '@ngrx/store';

export const actionPosts = createAction(
  '[Post] Action Posts'
);

export const actionPostsSuccess = createAction(
  '[Post] Action Posts Success',
  props<{ data: any }>()
);

export const actionPostsFailure = createAction(
  '[Post] Action Posts Failure',
  props<{ error: any }>()
);
