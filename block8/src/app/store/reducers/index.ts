import { ActionReducerMap } from '@ngrx/store'
import * as fromNews from './news.reducers'

export interface State{
    newsObjects: fromNews.NewsState
}

export const reducers: ActionReducerMap<State> = {
    newsObjects: fromNews.reducer
}