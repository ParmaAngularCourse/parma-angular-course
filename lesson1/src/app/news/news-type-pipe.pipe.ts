import { Pipe, PipeTransform } from '@angular/core';
import { NewsTypes } from './news-types';

@Pipe({
  name: 'newsTypePipe'
})
export class NewsTypePipePipe implements PipeTransform {

  transform(value?: NewsTypes, ...args: unknown[]): string {
    let result = "";

    switch (value) {
        case NewsTypes.Politic:
          result = "Политика";
        break;
        case NewsTypes.Travel:
          result = "Туризм";
        break;
        case NewsTypes.Economic:
          result = "Экономика";
        break;
        case NewsTypes.Since:
          result = "Наука";
        break;
        case NewsTypes.Internet:
          result = "Интернет";
        break;

      default:
        break;
    }

    args.forEach(function(item) {
      if(item == 'shortName'){
        result=result[0];
        return;
      }
    });

    return result;
  }

}
