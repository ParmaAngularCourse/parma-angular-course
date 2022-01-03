import { Pipe, PipeTransform } from '@angular/core';
import { PostObj } from './all-posts/post-types';

@Pipe({
  name: 'postTitleCasePipe'
})
export class PostTitleCasePipePipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length > 1)
    {
      return value.charAt(0).toLocaleUpperCase() + value.slice(1).toLocaleLowerCase();
    }
    return value;
  }

}
