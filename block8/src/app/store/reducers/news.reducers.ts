import { Action, createReducer, on } from "@ngrx/store";
import { NewsFilter } from "../../../model/NewsFilter";
import { News } from "../../../model/News";
import * as fromActions from '../actions'
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

/*export interface NewsState{
    newsData?: News[],
    filter?: NewsFilter
}*/

export interface NewsState extends EntityState<News>{    
    filter?: NewsFilter
}

export const adapter: EntityAdapter<News> = createEntityAdapter<News>({
    selectId: obj => obj.id,
    sortComparer: (a: News, b: News) => b.date.getTime() - a.date.getTime()
});

//const initialState: NewsState = {}
const initialState: NewsState = adapter.getInitialState({
    filter: undefined
});

const newsReducer = createReducer(
    initialState,
    on(fromActions.loadNews, (state) => ({ ...state})),
    on(fromActions.loadNewsSuccess, (state, { newsData, filter }) => { return adapter.setAll(newsData, { ...state, filter: filter})} /*({ ...state, newsData: newsData, filter: filter})*/),
    on(fromActions.loadNewsError, (state, { error }) => ({ ...state})),
    on(fromActions.editNewsError, (state, { error }) => ({ ...state})),
    on(fromActions.deleteNewsError, (state, { error }) => ({ ...state})),
    on(fromActions.editNewsSuccess, (state, { editNews}) => { return adapter.upsertOne(editNews, state)}
    /*(
    {   
        ...state,
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
    })*/
    ),
    on(fromActions.addNewsSuccess, (state, { editNews}) => { return adapter.upsertOne(editNews, state)}
    /*(
    { ...state,
        newsData: [ ...state?.newsData ?? [], editNews ]
    })*/
    ),
    on(fromActions.deleteNewsSuccess, (state, { deletingNewsId }) => {
        return adapter.removeOne(deletingNewsId, state)
    }
    /*{        
        var newsArray = [ ...state.newsData ?? [] ];
        newsArray.splice(deletingNewsIndex, 1);
        return {
            ...state,
            newsData: newsArray
        }
    }*/
    )
)

export function reducer(state: NewsState|undefined, action: Action): NewsState{
    return newsReducer(state, action)
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();