import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { News } from '../news-types';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  @Input("newsItem") news!: News;
  @Output() removeNews : EventEmitter<number> = new EventEmitter();
  @Output() editNews : EventEmitter<News> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changeSelection($event: any, newsItem: News) {
    newsItem.selected = $event.currentTarget.checked;
  }

  remove($event: any, newsItem: News) {
    this.removeNews.emit(newsItem.id);
  }

  openEditNewsDialog($event: any, newsItem: News) {
    this.editNews.emit(newsItem);
    this.router.navigate(['', { outlets: { editform: "edit-news/"+ newsItem.id } }]);
  }
}
