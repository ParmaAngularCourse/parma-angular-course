import {Action} from '@ngrx/store';
import {Information, searchData} from '../../news/news-types';

export const  LOAD_POSTS = '[Post List] Load Posts';
export const  LOAD_POSTS_SUCCESS = '[Post List] Load Posts Success';


export class LoadPosts implements Action{
    readonly type = LOAD_POSTS;

    constructor (public payload: searchData){

    }
}

export class LoadPostsSuccess implements Action{
    readonly type = LOAD_POSTS_SUCCESS;

    constructor (public payload: Information[]){

    }
}


export type AllPostActions = 
LoadPosts
| LoadPostsSuccess;

