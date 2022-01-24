import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NewsType } from '../news-list/news-types';

@Component({
  selector: 'app-news-type-filters',
  templateUrl: './news-type-filters.component.html',
  styleUrls: ['./news-type-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsTypeFiltersComponent implements OnInit {

  public newsTypeFilters!: any[]
  constructor() {
    this.newsTypeFilters = this.getNewsTypeFilters();
  }

  ngOnInit(): void {
  }

  getNewsTypeFilters() {
    const keysAndValues = Object.entries(NewsType);
    const typeValues : any[] = [];

    keysAndValues.forEach((keyAndValue: any) => {
        typeValues.push(
          {
            value: keyAndValue[0],
            name: keyAndValue[1]
          });
    });

    return typeValues;
  }
}
