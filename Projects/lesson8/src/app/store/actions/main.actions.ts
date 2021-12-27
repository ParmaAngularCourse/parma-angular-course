import { createAction, props } from "@ngrx/store";

export const addSnackBarMessage = createAction(
    '[App Shell UI] Add SnackBar Message',
    props<{ message: string }>()
);