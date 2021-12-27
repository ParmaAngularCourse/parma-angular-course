import { createReducer, on, Action } from "@ngrx/store";
import * as fromActions from  '../actions';

export interface MainState {
    snackBarMessage: string
}

const initialState: MainState = {
    snackBarMessage: ""
}

const mainReducer = createReducer(
    initialState,
    on(fromActions.addSnackBarMessage, (state, { message }) => { return ( { ...state, snackBarMessage: message }) })
);

export function reducer(state: MainState | undefined, action: Action): MainState {
    return mainReducer(state, action);
}