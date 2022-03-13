import { createAction, props } from '@ngrx/store';
import { NewsPost } from '../../../models/NewsPost';

export const LOAD_NEWS = '[News List] Load News';
export const LOAD_NEWS_SUCCESS = '[News List] Load News Success';

export const loadPost = createAction(LOAD_NEWS);
export const loadPostSuccess = createAction(
  LOAD_NEWS_SUCCESS,
  props<{ news: NewsPost[] }>()
);
