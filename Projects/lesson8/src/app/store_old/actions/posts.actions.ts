import { Action } from '@ngrx/store';
import { PostObj } from '../../models/post-types';

export const LOAD_POSTS = '[Post List] Load Posts';
export const LOAD_POSTS_SUCCESS = '[Post List] Load Posts Success';

export class LoadPosts implements Action {
    readonly type = LOAD_POSTS;
}

export class LoadPostsSuccess implements Action {
    readonly type = LOAD_POSTS_SUCCESS;
    constructor(public payload: PostObj[]) {}
}

export type AllPostActions = 
LoadPosts
| LoadPostsSuccess;