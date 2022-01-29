import { Pipe, PipeTransform } from '@angular/core';
import { TypeNews } from 'src/model/TypeNews';
import { TypeNewsColorDictionary } from 'src/model/TypeNewsColorDictionary';

@Pipe({
  name: 'getNewsColorByTypeKey'
})
export class GetNewsColorByTypeKeyPipe implements PipeTransform {

  transform(newsTypeKey: string): string {
    var key = newsTypeKey as keyof typeof TypeNews;
    if(key){
      var typeNews = TypeNews[key];
      return TypeNewsColorDictionary.get(typeNews) ?? "";
    }
    else{
      return "";
    }
  }

}
