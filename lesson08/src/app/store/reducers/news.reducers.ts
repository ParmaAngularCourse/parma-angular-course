import {Action, createReducer, on} from "@ngrx/store";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {NewsItem} from "../../news/news-types";
import * as fromActions from '../actions'

export interface NewsState extends EntityState<NewsItem> {
  //news?: NewsItem[]
  allLoaded: boolean
}

export const adapter: EntityAdapter<NewsItem> = createEntityAdapter<NewsItem>({
  selectId: obj => obj.id,
  sortComparer: (a, b) => a.id - b.id
});

const initialState: NewsState = adapter.getInitialState({
  allLoaded: false
})

const newsReducer = createReducer(
  initialState,

  /*on(fromActions.loadNews,(state) => ({
    ...state
  })),*/

  on(fromActions.loadNewsSuccess, (state, { news }) => {
    return adapter.setAll(news, { ...state, allLoaded: true })
  }
  /*({
    ...state,
    news: news
  })*/
  ),

  on(fromActions.editNewsItemSuccess, (state, { newsItem }) => {
    return adapter.updateOne({
      id: newsItem.id,
      changes: {
        date: newsItem.date,
        head: newsItem.head,
        desc: newsItem.desc,
        tag: newsItem.tag
      }
    }, state);
  }
  /*({
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
  })*/),

  on(fromActions.addNewsItemSuccess, (state, { newsItem }) => {
    return adapter.addOne(newsItem, state);
  }
  /*({
    ...state,
    news: state.news?.concat(newsItem)
  })*/),

  on(fromActions.removeNewsItemSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }/*({
    ...state,
    news: state.news?.filter(item => item.id !== id)
  })*/),

  on(fromActions.selectNewsItem, (state,  { id, isSelected }) => {
    return adapter.updateOne({
      id: id,
      changes: {
        selected: isSelected
      }
    }, state);
  } /*({
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
  })*/),
);

export function reducer(state: NewsState | undefined, action: Action) : NewsState {
  return newsReducer(state, action);
}

export const {selectIds, selectEntities, selectAll, selectTotal} = adapter.getSelectors();
