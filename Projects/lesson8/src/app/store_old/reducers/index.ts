import { ActionReducerMap } from '@ngrx/store';
import * as fromPosts from './posts.reducers';
import * as fromActions from  '../actions';

export interface State {
    postObjects: fromPosts.PostState
}

export const reducers: ActionReducerMap<State, fromActions.AllPostActions> = {
    postObjects: fromPosts.reducer
}