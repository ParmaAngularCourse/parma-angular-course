import { Directive, HostBinding, Input } from '@angular/core';
import { NewsType } from '../news-types';

@Directive({
  selector: '[appNewsBackColor]'
})
export class NewsBackColorDirective {

  private backColors: Map<NewsType, string> = new Map<NewsType, string>(
  [
    [NewsType.Internet, 'gray'],
    [NewsType.Economics, 'orange'],
    [NewsType.Politics, 'green'],
    [NewsType.Science, 'blue'],
    [NewsType.Tourism, 'red']
  ]);

  @HostBinding('style.color') foregroundColor: string = 'white';
  @HostBinding('style.backgroundColor') divBackColor: string = '';
  @HostBinding('style.padding') padding: string = '2px';
  @Input('appNewsBackColor') newsType!: NewsType;
  constructor() { }

  ngOnInit() {
    let tempColor = this.backColors.get(this.newsType);
    if (tempColor) {
      this.divBackColor = tempColor;
    }
  }

}
