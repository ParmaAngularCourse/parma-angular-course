import { createSelector } from '@ngrx/store';
import { TypeNews } from '../../../model/TypeNews';
import * as fromReducer from '../reducers'
import * as fromNewsReducer from '../reducers/news.reducers'

/*export function selectNews(state: fromReducer.State){
    return {
        news: state.newsObjects?.newsData ?? [],
        filter: state.newsObjects.filter
    };
}

export function selectNewsCount(state: fromReducer.State){
    return state.newsObjects.newsData?.length ?? 0;
}*/

export const selectNews = createSelector(fromReducer.selectNewsState, fromNewsReducer.selectAll)
export const selectNewsCount = createSelector(fromReducer.selectNewsState, fromNewsReducer.selectTotal)

export const selectNewsById = (id:number) => 
  createSelector(selectNews, (newsData) => newsData?.find(x=>x.id == id) ?? null);

export const selectNewsByType = (newsType: TypeNews) =>
  createSelector(selectNews, (newsData) => newsData ? newsData.filter(n=>n.type === newsType).length : 0);

