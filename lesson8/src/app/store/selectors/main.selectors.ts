import * as fromReducers from '../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export function selectSnckBarMessage(state: fromReducers.State) {
  return state.mainObjects.snackBarMessage
}
