import { createAction, props } from "@ngrx/store"
import { Report } from "../../news/news-types";

export const loadPosts = createAction(
  '[Post List] Load Posts'
);

export const loadPostsSuccess = createAction(
  '[Post List] Load Posts Success',
  props<{ posts: Report[] }>()
);

export const updateReport = createAction(
  '[Post List] Update Report',
  props<{ report: Report }>()
);

export const updateReportSuccess = createAction(
  '[Post List] Update Report Success',
  props<{ report: Report }>()
);

export const updateReportError = createAction(
  '[Post List] Update Report Error'
);
