import * as fromReducer from '../reducers'

export function selectNews(state: fromReducer.State) {
  return state.newsItems.news;
}

export function selectNewsInThreeColumn(state: fromReducer.State) {
  let old = [...state.newsItems.news];
  let results = [];
  while (old.length) {
    results.push(old.splice(0, 3));
  }
  return results;
}

export function selectIsSomeItemSelected(state: fromReducer.State) {
  return state.newsItems.news.some(item => item.selected);
}
