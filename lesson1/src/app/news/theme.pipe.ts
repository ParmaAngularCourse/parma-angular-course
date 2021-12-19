import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'themePipe'
})
export class ThemePipe implements PipeTransform {

  transform(value: string): string {
    return value.substr(0, 1).toUpperCase() ;
  }
}
