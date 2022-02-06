import { createAction, props } from '@ngrx/store';


export const actionSnackBar = createAction(
  '[App Shell UI] Add Snack Bar Message',
  props<{ message: string }>()
);
