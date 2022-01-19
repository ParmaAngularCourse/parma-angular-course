import {createAction, props} from '@ngrx/store'
import {NewsItemModel} from "../../news/news-types";

export const loadNews = createAction(
  '[News List] Load News',
  props<{ searchVal : string, selectedTag: string }>()
);

export const loadNewsSuccess = createAction(
  '[News List] Load News Success',
  props<{news : NewsItemModel[] }>()
)
