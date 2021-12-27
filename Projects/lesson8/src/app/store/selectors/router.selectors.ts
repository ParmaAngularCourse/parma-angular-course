import { createSelector } from '@ngrx/store';
import * as fromStore from '../reducers';

export const selectRouteParams = createSelector(fromStore.getRouterState, routerState => {
    return routerState && routerState.state ? routerState.state.params : null
})