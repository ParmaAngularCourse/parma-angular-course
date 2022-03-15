import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { News } from "../../news-list/news-types";
import * as fromActions from '../actions';

export interface NewsState extends EntityState<News> {
    allLoaded: boolean
}
export const adapter: EntityAdapter<News> = createEntityAdapter<News>();

const initialState: NewsState = adapter.getInitialState({
    allLoaded: false
});

const newsReducer = createReducer(
    initialState,
    on(fromActions.loadNewsSuccess, (state, { newsList }) => { return adapter.setAll(newsList, { ...state, allLoaded: true }) }),
    on(fromActions.editNewsSuccess, (state, { news }) => 
        {
            return adapter.updateOne({
                id: news.id,
                changes: {
                    date: news.date,
                    text: news.text,
                    title: news.title,
                    type: news.type
                }
            }, state)
        })
)

export function reducer(state: NewsState | undefined, action: Action): NewsState {
    return newsReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();