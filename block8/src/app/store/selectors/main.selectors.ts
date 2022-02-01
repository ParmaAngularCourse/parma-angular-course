import * as fromReducer from '../reducers'

export function selectSnackBarMessage(state: fromReducer.State){
    return state.mainObjects.snackBarMessage;
}