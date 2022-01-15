import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterPipe',
})
export class FirstLetterPipePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): string {
    return value.charAt(0);
  }
}
