import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCapitalLetter'
})
export class FirstCapitalLetterPipe implements PipeTransform {

  transform(value: string): string {
    return value[0].toUpperCase() + value.substring(1);
  }

}
