import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { NewsType } from './news-list/news-types';

@Directive({
  selector: '[newsTypeStyles]'
})
export class NewsTypeStylesDirective implements OnInit {
  
  @HostBinding('style.backgroundColor') backgroundColor : string = '';
  @HostBinding('style.padding') padding : string = '2px 5px';
  @HostBinding('style.borderRadius') borderRadius : string = '5px';
  @Input('newsTypeStyles') item!: NewsType;

  private newsTypeColors = new Map<NewsType, string>([
    [NewsType.Politics, "lightgreen"],
    [NewsType.Tourism, "lightblue"],
    [NewsType.Economics, "yellow"],
    [NewsType.Science, "aqua"],
    [NewsType.Internet, "lightgrey"]
  ]);

  constructor() { }

  ngOnInit() {
    this.backgroundColor = this.newsTypeColors.get(this.item) ?? '';
  }
}
