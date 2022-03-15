import { createSelector } from '@ngrx/store';
import { News, NewsType } from "../../news-list/news-types";
import * as fromStore from '../reducers';
import * as fromNewsReducers from '../reducers/news.reducers';

export const selectNews = createSelector(fromStore.selectNewsState, fromNewsReducers.selectAll);
export const selectNewsCount = createSelector(fromStore.selectNewsState, fromNewsReducers.selectTotal);
export const selectNewsLoad = createSelector(fromStore.selectNewsState, (newsState) => { return newsState.allLoaded });
export const selectNewsByTypeCount = (newsType: NewsType) =>
    createSelector(
        selectNews,
        (news) => news.filter(item => item.type === newsType).length
    );