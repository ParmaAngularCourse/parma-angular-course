import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalLetterPipe'
})
export class CapitalLetterPipePipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): string  | null{
    if(value)
    return value.charAt(0).toUpperCase() + value.slice(1)
    else return null;
  }

}
