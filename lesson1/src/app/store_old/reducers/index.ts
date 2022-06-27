import { ActionReducerMap } from '@ngrx/store';
import * as formPosts from './post.reducers';
import * as formActions from '../actions';

export interface State{
    postObjects: formPosts.PostState
}

export const reducers: ActionReducerMap<State, formActions.AllPostActions> = {
    postObjects: formPosts.reducer
}