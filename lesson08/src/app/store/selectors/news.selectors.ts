import * as fromReducer from '../reducers'
import {createSelector} from "@ngrx/store";
import {NewsItemModel} from "../../news/news-types";

export function selectAllNews(state: fromReducer.State) {
  return state.newsItems.news ?? [];
}

export function selectNewsInThreeColumn(state: fromReducer.State) {
  if(!state.newsItems.news)
    return [];

  let old = [...state.newsItems.news];
  let results = [];
  while (old.length) {
    results.push(old.splice(0, 3));
  }
  return results;
}

export function selectIsSomeItemSelected(state: fromReducer.State) {
  return state.newsItems.news?.some(item => item.selected) ?? false;
}

export const selectItemById = (id: number) => createSelector(
  selectAllNews,
  (news : NewsItemModel[]) => {
    return news.find(item => item.id === id)
  }
)
