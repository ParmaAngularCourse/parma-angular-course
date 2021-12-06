import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsTitleCapitalLetter'
})
export class NewsTitleCapitalLetterPipe implements PipeTransform {

  transform(newsTitle: string): string {
    console.log(newsTitle);
    if (newsTitle) {
      return newsTitle[0].toUpperCase() + newsTitle.slice(1);
    }
    return '';
  }
}