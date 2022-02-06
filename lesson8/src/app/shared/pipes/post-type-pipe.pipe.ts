import { Pipe, PipeTransform } from '@angular/core';
import { PostType } from '../../all-posts/post-types';

@Pipe({
  name: 'postTypePipe',
})
export class PostTypePipePipe implements PipeTransform {
  transform(value: PostType | string | null, CharAtIndex?: number): string {
    let result = '';
    //Можно инкапсулировать
    switch (value as PostType) {
      case PostType.economic:
        result = 'Экономика';
        break;
      case PostType.internet:
        result = 'Интернет';
        break;
      case PostType.politic:
        result = 'Политика';
        break;
      case PostType.science:
        result = 'Наука';
        break;
      case PostType.tourism:
        result = 'Туризм';
        break;
      default:
        return 'Не указан тип';
    }

    if (CharAtIndex != undefined) {
      result = result.charAt(CharAtIndex).toLocaleUpperCase();
    }
    return result;
  }
}
