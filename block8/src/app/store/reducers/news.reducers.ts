import { Action, createReducer, on } from "@ngrx/store";
import { NewsFilter } from "../../../model/NewsFilter";
import { INewsData } from "../../../model/INewsData";
import * as fromActions from '../actions'

export interface NewsState{
    newsData?: INewsData[],
    filter?: NewsFilter
}

const initialState: NewsState = {}

const newsReducer = createReducer(
    initialState,
    on(fromActions.loadNews, (state) => ({ ...state})),
    on(fromActions.loadNewsSuccess, (state, { newsData, filter }) => ({ ...state, newsData: newsData, filter: filter})),
    on(fromActions.loadNewsError, (state) => ({ ...state})),
    on(fromActions.editNewsSuccess, (state, { editNews}) => (
        { ...state,
          newsData: state.newsData?.map(n=>{
            if(n.id ===  editNews.id){
                return{
                    ...editNews                    
                }
            }
            else{
                return {
                    ...n
                }
            }
          })
    })),
    on(fromActions.addNewsSuccess, (state, { editNews}) => (
        { ...state,
          newsData: [ ...state?.newsData ?? [], editNews ]
    }))
)

export function reducer(state: NewsState|undefined, action: Action): NewsState{
    return newsReducer(state, action)
}