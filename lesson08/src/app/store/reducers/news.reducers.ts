import {Action, createReducer, on} from "@ngrx/store";
import {NewsItem} from "../../news/news-types";
import * as fromActions from '../actions'

export interface NewsState {
  news?: NewsItem[]
}

const initialState: NewsState = {}

const newsReducer = createReducer(
  initialState,

  on(fromActions.loadNews,(state) => ({
    ...state
  })),

  on(fromActions.loadNewsSuccess, (state, { news }) => ({
    ...state,
    news: news
  })),

  on(fromActions.editNewsItemSuccess, (state, { newsItem }) => ({
    ...state,
    news: state.news?.map(
      item  => {
        if (item.id == newsItem?.id) {
          return {
            ...item,
            id: newsItem.id,
            date: newsItem.date,
            head: newsItem.head,
            desc: newsItem.desc,
            tag: newsItem.tag
          }
        } else {
          return item;
        }
      }
    )
  })),

  on(fromActions.addNewsItemSuccess, (state, { newsItem }) => ({
    ...state,
    news: state.news?.concat(newsItem)
  })),

  on(fromActions.removeNewsItem, (state, { id }) => ({
    ...state,
    news: state.news?.filter(item => item.id !== id)
  })),

  on(fromActions.selectNewsItem, (state,  { id, isSelected }) => ({
    ...state,
    news: state.news?.map(
      item  => {
        if (item.id == id) {
          return {
            ...item,
            selected: isSelected,
          }
        } else {
          return item;
        }
      }
    )
  })),
);

export function reducer(state: NewsState | undefined, action: Action) : NewsState {
  return newsReducer(state, action);
}
