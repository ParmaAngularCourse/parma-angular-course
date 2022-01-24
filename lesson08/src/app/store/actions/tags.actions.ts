import {createAction, props} from '@ngrx/store'
import {NewsTag} from "../../news/news-types";

export const loadTagsList = createAction(
  '[Tags List] Load Tags List'
);

export const loadTagsListSuccess = createAction(
  '[Tags List] Load Tags List Success',
  props<{tags : NewsTag[] }>()
)
