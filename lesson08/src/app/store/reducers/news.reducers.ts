import {Action, createReducer, on} from "@ngrx/store";
import {NewsItemModel} from "../../news/news-types";
import * as fromActions from '../actions'

export interface NewsState {
  news?: NewsItemModel[]
}

const initialState: NewsState = {
  /*news: []*/
}

const newsReducer = createReducer(
  initialState,
  on(fromActions.loadNews,(state) =>
    ({
      ...state
    })
  ),
  on(fromActions.loadNewsSuccess, (state, { news }) =>
    ({
      ...state,
      news: news
    })
  ),
  on(fromActions.editNewsItemSuccess, (state, { newsItem }) =>
    ({
      ...state,
      news: state.news?.map(
        item  => {
          if (item.id == newsItem?.id) {
            return new NewsItemModel(
              newsItem.id,
              newsItem.date,
              newsItem.head,
              newsItem.desc,
              newsItem.tag)
          } else {
            return item;
          }
        }
      )
    })
  )
);

export function reducer(state: NewsState | undefined, action: Action) : NewsState {
  return newsReducer(state, action);
}
