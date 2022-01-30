import { ActionReducerMap } from '@ngrx/store'
import * as fromNews from './news.reducers'
import * as fromActions from '../actions'

export interface State{
    newsObjects: fromNews.NewsState
}

export const reducers: ActionReducerMap<State, fromActions.AllNewsActions> = {
    newsObjects: fromNews.reducer
}