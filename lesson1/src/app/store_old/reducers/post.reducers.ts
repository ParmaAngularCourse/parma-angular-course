import { Information } from 'src/app/news/news-types';
import * as formActions from '../actions';

export interface PostState{
    posts: Information[]
}

const initialState: PostState = {
    posts: []
}

export function reducer(state = initialState, action: formActions.AllPostActions): PostState {

    switch (action.type) {
        case formActions.LOAD_POSTS:
            return {
                    ...state
            }

        case formActions.LOAD_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            }
            
        default:
            {
                return state;
            }
    }
}



