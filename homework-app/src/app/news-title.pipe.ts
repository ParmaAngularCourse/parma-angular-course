import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsTitle'
})
export class NewsTitlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.length > 0 ? value[0].toUpperCase().concat(value.slice(1)): value;
  }

}
