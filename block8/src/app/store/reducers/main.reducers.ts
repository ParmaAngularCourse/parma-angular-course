import { Action, createReducer, on } from "@ngrx/store";
import * as fromActions from '../actions'
import { StatusMsg } from "../../../model/StatusMsg";

export interface MainState {
    snackBarMessage: StatusMsg
}

const initialState: MainState = {
    snackBarMessage: new StatusMsg(true, '')
}

const mainReducer = createReducer(
    initialState,
    on(fromActions.addSnackBarMessage, (state, {statusMessage})=> {return ( { ...state, snackBarMessage: statusMessage})})
)

export function reducer(state:MainState|undefined, action: Action):MainState{
    return mainReducer(state, action)
}