import {createSelector} from "@ngrx/store";
import * as fromReducer from '../reducers'
import * as fromTagsReducers from '../reducers/tags.reducers'

export const selectAllTags = createSelector(
  fromReducer.selectTagsState,
  fromTagsReducers.selectAll);

export const selectAllTagsEntities = createSelector(
  fromReducer.selectTagsState,
  fromTagsReducers.selectEntities);

export const selectTagsAllLoaded = createSelector(
  fromReducer.selectTagsState,
  (tagsState) => tagsState.allLoaded)

export const getTagsByTagsId = (tagsId: string) => createSelector(
  selectAllTagsEntities,
  (entities) => entities[tagsId]
)
