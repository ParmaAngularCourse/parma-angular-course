import { Pipe, PipeTransform } from '@angular/core';
import { PostType } from '../../../lesson3/src/app/all-posts/post-types';

@Pipe({
  name: 'postTypePipe'
})
export class PostTypePipePipe implements PipeTransform {

  transform(value: PostType| string, CharAtIndex?: number): string {
    let result = "";
    switch (value as PostType) {
      case PostType.economic: result = "Экономика"; break;
      case PostType.internet: result = "Интернет"; break;
      case PostType.politic: result = "Политика"; break;
      case PostType.science: result = "Наука"; break;
      case PostType.tourism: result = "Туризм"; break;
      default: return "Не указан тип";
    }

    if (CharAtIndex != undefined)
    {
      result = result.charAt(CharAtIndex).toLocaleUpperCase();
    }
    return result;
  }

}
