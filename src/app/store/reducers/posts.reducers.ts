import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { Report } from "../../news/news-types";
import * as fromActions from "../actions";

export interface PostState extends EntityState<Report> {
  allLoaded: boolean
}

export const adapter: EntityAdapter<Report> = createEntityAdapter<Report>();

const initialState: PostState = adapter.getInitialState({
  allLoaded: false
});

const postsReducer = createReducer(
  initialState,
  on(fromActions.loadPostsSuccess, (state, { posts }) => { return adapter.setAll(posts, { ...state, allLoaded: true }) }),
  on(fromActions.updateReportSuccess, (state, { report }) => {
    return adapter.updateOne({
      id: report.id,
      changes: report
    }, state)
  }
))

export function reducer(state: PostState | undefined, action: Action): PostState {
  return postsReducer(state, action)
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
