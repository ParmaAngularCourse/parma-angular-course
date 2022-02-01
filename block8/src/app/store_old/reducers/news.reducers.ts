import { News } from "../../../model/News";
import { News } from "../../../model/News";
import * as fromActions from '../actions'

export interface NewsState{
    news: News[][]
}

const initialState: NewsState = {
    news: []
}

export function reducer(state = initialState, action: fromActions.AllNewsActions):NewsState {
    switch(action.type){
        case fromActions.LOAD_NEWS: {
            return {
                ...state
            }
        }

        case fromActions.LOAD_NEWS_SUCCESS: {
            return {
                ...state,
                news: action.payload
            }
        }

        case fromActions.LOAD_NEWS_ERROR: {
            return {
                ...state
            }
        }

        default: {
            return state;
            
        }
    }
}