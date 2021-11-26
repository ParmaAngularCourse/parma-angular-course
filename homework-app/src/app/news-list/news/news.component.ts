import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../news-types';
import { MatDialog } from '@angular/material/dialog';
import { NewsEditformComponent } from '../news-editform/news-editform.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  @Input("newsItem") news!: News;
  @Output() removeNews : EventEmitter<number> = new EventEmitter();

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  changeSelection(checked: boolean, newsItem: News) {
    newsItem.selected = checked;
  }

  remove($event: any, newsItem: News) {
    this.removeNews.emit(newsItem.id);
  }

  openEditNewsDialog($event: any, newsItem: News) {
    const dialogRef = this.dialog.open(NewsEditformComponent, {
      data: newsItem,
    });
    const subOnSaveNews = dialogRef.componentInstance.saveNews.subscribe(($newsToSave: News) => {
      newsItem.date = $newsToSave.date;
      newsItem.title = $newsToSave.title;
      newsItem.text = $newsToSave.text;
      this.cdr.detectChanges();
    })

    dialogRef.afterClosed().subscribe(result => {
      subOnSaveNews.unsubscribe();
    });
  }

}
