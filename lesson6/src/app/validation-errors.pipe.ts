import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationErrors'
})
export class ValidationErrorsPipe implements PipeTransform {

  transform(value: ValidationErrors | null | undefined): any[] {
    if (value)
    {
      let result = [];
      for(let error in value)
      {
        result.push(value[error]);
      }

      return result;
    }
    return [];
  }

}
