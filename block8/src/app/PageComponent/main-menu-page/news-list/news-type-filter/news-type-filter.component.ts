import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TypeNews } from 'src/model/TypeNews';

@Component({
  selector: 'app-news-type-filter',
  templateUrl: './news-type-filter.component.html',
  styleUrls: ['./news-type-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsTypeFilterComponent implements OnInit {
  public typeDataSource: typeof TypeNews = TypeNews;
  public newsType:TypeNews = TypeNews.Type0_None;

  constructor() {}

  ngOnInit(): void {}
}
