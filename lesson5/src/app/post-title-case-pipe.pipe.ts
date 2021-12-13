import { Pipe, PipeTransform } from '@angular/core';
import { PostObj } from './all-posts/post-types';

@Pipe({
  name: 'postTitleCasePipe'
})
export class PostTitleCasePipePipe implements PipeTransform {

  transform(value: PostObj): PostObj {
    if (value && value.title)
    {
      value.title = value.title.charAt(0).toLocaleUpperCase() + value.title.slice(1).toLocaleLowerCase();
    }
    return value;
  }

}
