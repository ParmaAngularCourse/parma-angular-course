import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseNamePipe'
})
export class UpperCaseNamePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return (!value) ? value : value[0].toUpperCase() + value.slice(1);;
  }

}
