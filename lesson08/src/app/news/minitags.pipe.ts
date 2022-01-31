import { Pipe, PipeTransform } from '@angular/core';
import {NewsTag} from "./news-types";

@Pipe({
  name: 'minitags'
})
export class MinitagsPipe implements PipeTransform {

  transform(value: NewsTag): string {
    return value.text.charAt(0).toUpperCase();
  }
}
