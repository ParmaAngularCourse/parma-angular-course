import { createAction, props } from "@ngrx/store"
import { StatusMsg } from "../../../model/StatusMsg";

export const addSnackBarMessage = createAction(
    '[App Shell UI] Add SnackBar Message',
    props<{ statusMessage: StatusMsg }>()
);