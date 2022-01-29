import { Pipe, PipeTransform } from '@angular/core';
import { TypeNews } from 'src/model/TypeNews';
import { TypeNewsColorDictionary } from 'src/model/TypeNewsColorDictionary';

@Pipe({
  name: 'getNewsColor'
})
export class GetNewsColorPipe implements PipeTransform {

  transform(newsType: TypeNews): string {
    return TypeNewsColorDictionary.get(newsType) ?? "";
  }

}
