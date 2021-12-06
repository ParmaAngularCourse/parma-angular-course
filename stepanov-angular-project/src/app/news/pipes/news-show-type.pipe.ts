import { Pipe, PipeTransform } from '@angular/core';
import { NewsType } from '../news-types';

@Pipe({
  name: 'newsShowType'
})
export class NewsShowTypePipe implements PipeTransform {

  transform(type: NewsType): string {
    return type.substring(0, 1).toUpperCase();
  }

}