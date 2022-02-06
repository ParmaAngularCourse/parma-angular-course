import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import { PostObj, PostType } from '../../all-posts/post-types';

export const selectPosts = (state: fromReducers.State) => state.postObjects;

export const selectorPosts = createSelector(selectPosts, (state: {posts?: PostObj[]}) => state.posts);

export const selectorCountPosts = createSelector(selectorPosts, (posts?: PostObj[]) => posts?.length);

export const selectorPostTypesCount = createSelector(
  selectorPosts,
  (posts?: PostObj[]) => {
    let result = [];
      for (const item in PostType) {
        let countPostType = posts?.filter(e=> e.postType === item).length || 0;
        result.push({postType: item, count: countPostType});
    }
    return result;
  }
);
