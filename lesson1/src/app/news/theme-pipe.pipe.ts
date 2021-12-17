import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'themePipe'
})
export class ThemePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.substr(0, 1) ;
  }

}
