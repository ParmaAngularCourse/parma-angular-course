import * as fromActions from '../actions'
import {Action, createReducer, on} from "@ngrx/store";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {NewsTag} from "../../news/news-types";

export interface TagsState extends EntityState<NewsTag> {
  allLoaded: boolean
}

const adapter: EntityAdapter<NewsTag> = createEntityAdapter<NewsTag>({
  selectId: obj => obj.tag
});

const initialState: TagsState = adapter.getInitialState({
  allLoaded: false
});

const tagsReducer = createReducer(
  initialState,
  on(fromActions.loadTagsListSuccess, (state, { tags }) => {
    return adapter.setAll(tags, {...state, allLoaded: true })
  })
)

export function reducer(state: TagsState | undefined, action: Action) : TagsState {
  return tagsReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
