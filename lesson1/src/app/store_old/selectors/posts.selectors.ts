import { isNgTemplate } from '@angular/compiler';
import { createSelector } from '@ngrx/store';
import * as formreducer from '../reducers';

export function selectPosts(state: formreducer.State){
    return state.postObjects.posts;
}

export function selectPostsCount(state: formreducer.State){
    return state.postObjects.posts.length;
}

export function selectPostsWithSomethingCount(state: formreducer.State){
    //return state.postObjects.posts.filter(item => item.text).length;

    return state.postObjects.posts.filter(item => item.title.indexOf("1") > 0).length;
}

export function selectPostsByNewsType(state: formreducer.State, newsType?: number){
    if(newsType)
        return state.postObjects.posts.filter(item => item.newsType == newsType);
    return state.postObjects.posts;
}

export const selectPostsWithoutSomethingCount = createSelector(
    selectPostsCount,
    selectPostsWithSomethingCount,
    (postsCount, PostsWithSomethingCount ) =>  postsCount - PostsWithSomethingCount
);
