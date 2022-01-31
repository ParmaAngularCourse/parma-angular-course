import * as fromStore from '../reducers'
import {createSelector} from "@ngrx/store";
import {getSelectors} from "@ngrx/router-store";
import {selectRouterState} from "../reducers";

/*export const selectRouteParams = createSelector(fromStore.selectRouterState, routerState => {
  return routerState && routerState.state ? routerState.state.params : null;
})

export const getSelectedTagId = createSelector(
  selectRouteParams,
  (params) => {
    const tagId = (params?.tagsId ?? "");
    return tagId === "all" ? "" : tagId;
  }
)*/

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors();

export const getSelectedTagId = createSelector(
  selectRouteParam('tagsId'),
  (param) => {
    const tagId = (param ?? "");
    return tagId === "all" ? "" : tagId;
  }
)

export const getModalNewsItemId = createSelector(
  selectRouterState,
  (routerState) => {
    const state = routerState.state.root.children.find(childrenState => childrenState.outlet === "modal");
    return state?.params?.id;
  }
)
