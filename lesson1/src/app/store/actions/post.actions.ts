import { createAction, props } from "@ngrx/store";
import { Information, searchData } from "src/app/news/news-types";

export const LoadPosts = createAction(
    '[Post List] Load Posts',
    props<{searchData: searchData}>()
    );

export const LoadPostsSuccess = createAction(
    '[Post List] Load Posts Success',
    props<{posts: Information[]}>()
    );



export const addPost = createAction(
        '[Post List] Add Post',
        props<{post: Information}>()
    );

export const addPostSuccess = createAction(
    '[Post List] Add Post Success',
    props<{post: Information}>()
);

export const addPostReset = createAction(
    '[Post List] Add Post Reset'
);