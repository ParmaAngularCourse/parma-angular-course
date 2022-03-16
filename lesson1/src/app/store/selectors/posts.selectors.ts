import { createSelector } from '@ngrx/store';
import { NewsPostTag } from 'src/models/NewsPostTag';
import * as fromReducers from '../reducers';

export function selectPosts(state: fromReducers.State) {
  return state.news.news;
}
export function selectPostsCount(state: fromReducers.State) {
  return state.news.news?.length;
}

export const selectPostsByTag = (tag: NewsPostTag) =>
  createSelector(selectPosts, (news) => news?.filter((x) => x.tag == tag).length);
