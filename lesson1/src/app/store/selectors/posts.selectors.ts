import { isNgTemplate } from '@angular/compiler';
import { createSelector } from '@ngrx/store';
import { NewsTypes } from 'src/app/news/news-types';
import * as formreducer from '../reducers';

export function selectPosts(state: formreducer.State){
    return state.postObjects.posts;
}

export function selectPostsCount(state: formreducer.State){
    return state.postObjects.posts?.length;
}

export function selectPostsWithSomethingCount(state: formreducer.State){
    //return state.postObjects.posts.filter(item => item.text).length;

    return state.postObjects.posts?.filter(item => item.title.indexOf("1") > 0).length;
}

export function selectPostsByNewsType(state: formreducer.State, newsType?: number){
    if(newsType)
        return state.postObjects.posts?.filter(item => item.newsType == newsType);
    return state.postObjects.posts;
}

export function selectPostsEconomic(state: formreducer.State){
    return state.postObjects.posts?.filter(item => item.newsType == NewsTypes.Economic).length;
}
export function selectPostsInternet(state: formreducer.State){
    return state.postObjects.posts?.filter(item => item.newsType == NewsTypes.Internet).length;
}
export function selectPostsPolitic(state: formreducer.State){
    return state.postObjects.posts?.filter(item => item.newsType == NewsTypes.Politic).length;
}
export function selectPostsSince(state: formreducer.State){
    return state.postObjects.posts?.filter(item => item.newsType == NewsTypes.Since).length;
}
export function selectPostsTravel(state: formreducer.State){
    return state.postObjects.posts?.filter(item => item.newsType == NewsTypes.Travel).length;
}


export const selectPostsWithoutSomethingCount = createSelector(
    selectPostsCount,
    selectPostsWithSomethingCount,
    (postsCount, PostsWithSomethingCount ) => (postsCount && PostsWithSomethingCount ) ? postsCount - PostsWithSomethingCount : 0
);
