import { Pipe, PipeTransform } from '@angular/core';
import { PostType } from './all-posts/post-types';

@Pipe({
  name: 'postTypeBtnStyle'
})
export class PostTypeBtnStylePipe implements PipeTransform {

  transform(value: PostType | string | null): string {
    if (value)
    {
      switch(value as PostType){
        case PostType.politic:
          return "buttonStyle politic";
        case PostType.economic:
          return "buttonStyle economic";
        case PostType.science:
          return "buttonStyle science";
        case PostType.tourism:
          return "buttonStyle tourism";
        case PostType.internet:
          return "buttonStyle internet";
        default: return "";
      }
    }
    return "";
  }

}
