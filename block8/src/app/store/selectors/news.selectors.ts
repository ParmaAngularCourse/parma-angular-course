import { createSelector } from '@ngrx/store';
import { TypeNews } from '../../../model/TypeNews';
import * as fromReducer from '../reducers'

export function selectNews(state: fromReducer.State){
    return {
        news: state.newsObjects?.newsData ?? [],
        filter: state.newsObjects.filter
    };
}

export function selectNewsCount(state: fromReducer.State){
    return state.newsObjects.newsData?.length ?? 0;
}

export const selectNewsById = (id:number) => 
  createSelector(selectNews, (newsData) => newsData?.news.find(x=>x.id == id) ?? null);


export const selectNewsByType = (newsType: TypeNews) =>
  createSelector(selectNews, (newsData) => newsData?.news ? newsData.news.filter(n=>n.type === newsType).length : 0);