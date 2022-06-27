import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { Information } from "src/app/news/news-types";
import * as formActions from '../actions';

export interface PostState{
    posts?: Information[]
}

const initialState: PostState = {} 

const postReducer = createReducer(
    initialState,
    //on(formActions.LoadPosts, (state)=> ({...state})),
    on(formActions.LoadPostsSuccess, (state, {posts})=> ({...state, posts: posts})),
    on(formActions.addPostSuccess, (state, {post})=> (
        {
            ...state, 
            posts: state.posts?.indexOf(post) == -1? state.posts.concat(post): state.posts
        }
        ),)
)

export function reducer(state: PostState | undefined, action: Action): PostState{
    return postReducer(state, action)
}