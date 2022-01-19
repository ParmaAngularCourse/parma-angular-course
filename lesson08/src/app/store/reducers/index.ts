import {ActionReducerMap} from "@ngrx/store";
import * as fromNews from './news.reducers'

export interface State {
  newsItems: fromNews.NewsState
}

export const reducers: ActionReducerMap<State> = {
  newsItems: fromNews.reducer
}
