import {AbstractControl} from '@angular/forms';

export class MyDateYearValidator {
  static dateValidator(AC: AbstractControl) {
    if (AC && AC.value && parseInt(AC.value.toString().substring(0, 4)) < 1000) {
      return {'message': 'Год указан неверно. Укажите год > 1000'};
    }
    return null;
  }
}