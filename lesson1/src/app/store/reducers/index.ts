import { ActionReducerMap } from '@ngrx/store';
import * as formPosts from './post.reducers';

export interface State{
    postObjects: formPosts.PostState
}

export const reducers: ActionReducerMap<State> ={
    postObjects: formPosts.reducer
}