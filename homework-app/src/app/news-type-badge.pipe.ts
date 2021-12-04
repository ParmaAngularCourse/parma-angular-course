import { Pipe, PipeTransform } from '@angular/core';
import { NewsType } from './news-list/news-types';

@Pipe({
  name: 'newsTypeBadge'
})
export class NewsTypeBadgePipe implements PipeTransform {

  transform(value: NewsType, ...args: unknown[]): string {
    return value[0].toUpperCase();
  }

}
