import {createSelector} from "@ngrx/store";
import {NewsItem} from "../../news/news-types";
import * as fromReducer from '../reducers'
import * as fromNewsReducers from '../reducers/news.reducers'

/*export function selectAllNews(state: fromReducer.State) {
  return state.newsItems.news ?? [];
}*/
export const selectAllNews = createSelector(fromReducer.selectNewsState, fromNewsReducers.selectAll);

/*export function selectNewsInThreeColumn(state: fromReducer.State) {
  if(!state.newsItems.news)
    return [];

  let old = [...state.newsItems.news];
  let results = [];
  while (old.length) {
    results.push(old.splice(0, 3));
  }
  return results;
}*/
export const selectNewsInThreeColumn =  createSelector(
  selectAllNews,
  (news : NewsItem[]) => {
    if(!news)
      return [];

    let old = [...news];
    let results = [];
    while (old.length) {
      results.push(old.splice(0, 3));
    }
    return results;
  }
)

/*export function selectIsSomeItemSelected(state: fromReducer.State) {
  return state.newsItems.news?.some(item => item.selected) ?? false;
}*/
export const selectIsSomeItemSelected = createSelector(
  selectAllNews,
  (news : NewsItem[]) => news?.some(item => item.selected) ?? false
)

export const selectItemById = (id: number) => createSelector(
  selectAllNews,
  (news : NewsItem[]) => {
    return news.find(item => item.id === id)
  }
)

/*export function selectSelectedNewsItemIds(state : fromReducer.State) {
  return state.newsItems.news?.filter(item => item.selected).map(item => item.id) ?? [];
}*/
export const selectSelectedNewsItemIds = createSelector(
  selectAllNews,
  (news : NewsItem[]) => news.filter(item => item.selected).map(item => item.id)
)

/*export const selectNewsAllCount = () => createSelector(
  selectAllNews,
  (news : NewsItem[]) => news.length
)*/
export const selectNewsAllCount = createSelector(fromReducer.selectNewsState, fromNewsReducers.selectTotal);

export const selectNewsByTagsCount = (tag: string) => createSelector(
  selectAllNews,
  (news) => news.filter(item => item.tag === tag).length
)
