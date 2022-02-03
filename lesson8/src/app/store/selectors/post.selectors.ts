import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from '../reducers';
import { PostObj } from '../../all-posts/post-types';

export const selectPosts = (state: fromReducer.State) => state.postObjects;

export const selectorPosts = createSelector(selectPosts, (state: {posts: PostObj[]}) => state.posts);

export const selectorCountPosts = createSelector(selectorPosts, (posts: PostObj[]) => posts.length);
