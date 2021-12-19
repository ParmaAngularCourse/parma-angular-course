import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsTypePipe'
})
export class NewsTypePipePipe implements PipeTransform {

  transform(value?: string): string {
    if (value)
      return value.substring(0,1).toUpperCase(); 
    else return '0';
  }

}
