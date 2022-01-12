import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFirstLetter'
})
export class GetFirstLetterPipe implements PipeTransform {

  transform(value: string, ): string {
    return value[0];
  }

}
