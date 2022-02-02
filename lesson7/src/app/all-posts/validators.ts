import { AbstractControl } from '@angular/forms';

type errorValidation = {
  valid: { message: string }
}

export function required (nameField:string) {
  return function (control: AbstractControl): errorValidation | null {
    if (!control.value) {
      return { valid: {message: "Поле '"+ nameField + "' обязательно для заполнения"}}
    }
    return null;
  };
}
