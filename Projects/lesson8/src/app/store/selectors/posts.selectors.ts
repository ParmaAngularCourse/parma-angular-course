import { createSelector } from '@ngrx/store';
import { PostObj } from '../../models/post-types';
import * as fromStore from '../reducers';
import * as fromPostsReducers from '../reducers/posts.reducers';
import * as fromRouterSelectors from './router.selectors';

export const selectPosts = createSelector(fromStore.selectPostsState, fromPostsReducers.selectAll);
export const selectPostsCount = createSelector(fromStore.selectPostsState, fromPostsReducers.selectTotal);
export const selectPostsEntities = createSelector(fromStore.selectPostsState, fromPostsReducers.selectEntities);

/*export function selectPosts(state: fromReducer.State) {
    return state.postObjects.posts;
}

export function selectPostsCount(state: fromReducer.State) {
    return state.postObjects.posts?.length;
}*/

export const selectPostsWithDolorCount = createSelector(selectPosts, (posts) => posts.filter(item => item.title.startsWith('dolor')).length);

/*export function selectPostsWithDolorCount(state: fromReducer.State) {
    return state.postObjects.posts?.filter(item => item.title.startsWith('dolor')).length;
}*/

export const selectPostsWithoutDolorCount = createSelector(
    selectPostsCount,
    selectPostsWithDolorCount,
    (postsCount, postsWithDolorCount) => (postsCount && postsWithDolorCount) ? (postsCount - postsWithDolorCount) : 0
);

export const selectPostsLoad = createSelector(fromStore.selectPostsState, (postsState) => { return postsState.allLoaded })

export const getSelectedPostId  = createSelector(
    fromRouterSelectors.selectRouteParams,
    (params) => params && params.postId
)

export const getSelectedPost = createSelector(
    selectPostsEntities,
    getSelectedPostId,
    (entities, postId) => {
        return <PostObj | null>((entities && postId && entities[postId]) || null)
    }
)