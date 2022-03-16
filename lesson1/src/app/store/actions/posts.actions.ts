import { createAction, props } from '@ngrx/store';
import { NewsPost } from '../../../models/NewsPost';

export const LOAD_NEWS = '[News List] Load News';
export const LOAD_NEWS_SUCCESS = '[News List] Load News Success';

export const ADD_NEWS_POST = '[News List] Add News Post';
export const ADD_NEWS_POST_SUCCESS = '[News List]  Add News Post Success';

export const loadPost = createAction(LOAD_NEWS);
export const loadPostSuccess = createAction(
  LOAD_NEWS_SUCCESS,
  props<{ news: NewsPost[] }>()
);

export const addNewsPost = createAction(
  ADD_NEWS_POST,
  props<{ post: NewsPost }>()
);
export const addNewsPostSuccess = createAction(
  ADD_NEWS_POST_SUCCESS,
  props<{ post: NewsPost }>()
);
