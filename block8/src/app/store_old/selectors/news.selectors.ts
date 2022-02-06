import { createSelector } from '@ngrx/store';
import { TypeNews } from '../../../model/TypeNews';
import * as fromReducer from '../reducers'

export function selectNews(state: fromReducer.State){
    return state.newsObjects.news;
}

export function selectNewsCount(state: fromReducer.State){
    return state.newsObjects.news.flat().length;
}

export const selectNewsByType = (newsType: TypeNews) =>
  createSelector(selectNews, (news) => news.flat().filter(n=>n.type === newsType).length);