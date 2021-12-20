import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterLower'
})
export class FirstLetterLowerPipe implements PipeTransform {

  transform(value: string): string {
    return value[0].toLowerCase();
  }

}
