import {createAction, props} from "@ngrx/store";

export const addSnackBarMessage = createAction(
  '[Main UI] Add SnackBar Message',
  props<{ message : string }>()
)
