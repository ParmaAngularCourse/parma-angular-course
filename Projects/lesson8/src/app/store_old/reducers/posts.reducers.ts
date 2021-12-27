import { PostObj } from '../../models/post-types';
import * as fromActions from  '../actions';

export interface PostState {
    posts: PostObj[]
}

const initialState: PostState = {
    posts: []
}

export function reducer(state = initialState, action: fromActions.AllPostActions): PostState {
    switch (action.type) {
        case fromActions.LOAD_POSTS: {
            return {
                ...state
            }
        }

        case fromActions.LOAD_POSTS_SUCCESS: {
            return {
                ...state,
                posts: action.payload
            }
        }

        default: {
            return state;
        }
    }
}