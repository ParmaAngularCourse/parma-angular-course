import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalLetterPipe'
})
export class CapitalLetterPipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

}
