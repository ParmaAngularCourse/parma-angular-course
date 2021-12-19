import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlePipe'
})
export class TitlePipePipe implements PipeTransform {

  transform(value?: string): string {
    if (value)
      return value.slice(0,1).toUpperCase() + value.substring(1);
    else 
      return '';
  }

}
