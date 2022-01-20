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

export const editNewsItem = createAction(
  '[News List] Edit News Item',
  props<{ newsItem : NewsItemModel }>()
);

export const editNewsItemSuccess = createAction(
  '[News List] Edit News Item Success',
  props<{ newsItem : NewsItemModel }>()
)

export const editNewsItemReset = createAction(
  '[News List] Edit News Item Reset'
)
