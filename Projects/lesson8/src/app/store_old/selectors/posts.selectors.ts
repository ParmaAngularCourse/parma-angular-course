import { createSelector } from '@ngrx/store';
import * as fromReducer from '../reducers';

export function selectPosts(state: fromReducer.State) {
    return state.postObjects.posts;
}

export function selectPostsCount(state: fromReducer.State) {
    return state.postObjects.posts.length;
}

export function selectPostsWithDolorCount(state: fromReducer.State) {
    return state.postObjects.posts.filter(item => item.title.startsWith('dolor')).length;
}

export const selectPostsWithoutDolorCount = createSelector(
    selectPostsCount,
    selectPostsWithDolorCount,
    (postsCount, postsWithDolorCount) => postsCount - postsWithDolorCount
);