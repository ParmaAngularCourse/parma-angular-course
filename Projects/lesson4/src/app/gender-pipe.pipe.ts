import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe',
  pure: true
})
export class GenderPipePipe implements PipeTransform {

  transform(value: 0|1, ...args: unknown[]): unknown {
    //console.log(value);
    return value ? 'М':'Ж';
  }

}
