import { createSelector } from '@ngrx/store';
import { NewsType } from '../../news/news-types';
import * as fromStore from '../reducers';
import * as fromPostsReducers from '../reducers/posts.reducers';

export const selectPosts = createSelector(fromStore.selectPostsState, fromPostsReducers.selectAll);
export const selectPostsCount = createSelector(fromStore.selectPostsState, fromPostsReducers.selectTotal);
export const filters = createSelector(selectPosts, (posts) => <(keyof typeof NewsType)[]><any>Object.values(NewsType)
  .map(x => x + ": " + posts.filter(item => item.type == x).length));
export const selectPostsLoad = createSelector(fromStore.selectPostsState, (postsState) => { return postsState.allLoaded })
