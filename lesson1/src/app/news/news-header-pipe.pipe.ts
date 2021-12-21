import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsHeaderPipe'
})
export class NewsHeaderPipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let newVal =  (value[0]?.toUpperCase() + value?.slice(1)) ;
    return value?newVal:"";
  }

}
