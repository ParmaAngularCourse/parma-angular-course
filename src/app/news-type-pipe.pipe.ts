import { Pipe, PipeTransform } from '@angular/core';
import { NewsType } from './news/news-types';

@Pipe({
  name: 'newsTypePipe'
})
export class NewsTypePipePipe implements PipeTransform {

  transform(value: NewsType | null, ...args: unknown[]): unknown {
    return !value ? value : value[0];
  }

}
