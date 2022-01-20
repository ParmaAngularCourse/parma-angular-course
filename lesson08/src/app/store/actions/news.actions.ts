import {createAction, props} from '@ngrx/store'
import {NewsItem} from "../../news/news-types";
import {HttpErrorResponse} from "@angular/common/http";

export const loadNews = createAction(
  '[News List] Load News',
  props<{ searchVal : string, selectedTag: string }>()
);

export const loadNewsSuccess = createAction(
  '[News List] Load News Success',
  props<{news : NewsItem[] }>()
)

export const editNewsItem = createAction(
  '[News List] Edit News Item',
  props<{ newsItem : NewsItem }>()
);

export const editNewsItemSuccess = createAction(
  '[News List] Edit News Item Success',
  props<{ newsItem : NewsItem }>()
)

export const editNewsItemError = createAction(
  '[News List] Edit News Item Error',
  props<{ error : HttpErrorResponse}>()
)

export const editNewsItemReset = createAction(
  '[News List] Edit News Item Reset'
)

export const addNewsItem = createAction(
  '[News List] Add News Item',
  props<{ newsItem : NewsItem }>()
);

export const addNewsItemSuccess = createAction(
  '[News List] Add News Item Success',
  props<{ newsItem : NewsItem }>()
)

export const addNewsItemError = createAction(
  '[News List] Add News Item Error',
  props<{ error : HttpErrorResponse}>()
)

export const addNewsItemReset = createAction(
  '[News List] Add News Item Reset'
)

export const removeNewsItem = createAction(
  '[News List] Remove News Item',
  props<{ id : number }>()
);

export const removeNewsItemSuccess = createAction(
  '[News List] Remove News Item Success'
)

export const removeNewsItemError = createAction(
  '[News List] Remove News Item Error',
  props<{ error : HttpErrorResponse}>()
)

export const selectNewsItem = createAction(
  '[News List] Select News Item',
  props<{ id : number, isSelected: boolean }>()
);
