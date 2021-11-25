import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { News } from './news-type';



@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {

  public news: Array<News> = [
    { id: 1, title: "News 1", text: "this is a news 1 text", dateTime: "15.08.2021 14:23", isChecked: true },
    { id: 2, title: "News 2", text: "this is a news 2 text", dateTime: "23.09.2021 21:23", isChecked: false },
    { id: 3, title: "News 3", text: "this is a news 3 text", dateTime: "30.10.2021 09:00", isChecked: false },
    { id: 4, title: "News 4", text: "this is a news 4 text", dateTime: "01.11.2021 15:03", isChecked: false }
  ];

  public isOpenModal: boolean = false;
  public selectedNews: News | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  OnDeleteNews($event: number) {
    const index = this.news.findIndex(item => item.id === $event);
    if (index > -1) {
      this.news.splice(index, 1);
    }
  }

  OnEditNews($event: number) {
    const index = this.news.findIndex(item => item.id === $event);
    if (index > -1) {
      this.selectedNews = this.news[index];
      this.isOpenModal = true;
    }
  }

  OnSaveNews($event: News) {
    if ($event.id === 0) {
      $event.id = this.news.length + 1;
      this.news.push($event);
    } else {
      let index = this.news.findIndex(item => item.id === $event.id);
      if (index > -1) {
        this.news[index] = $event;
      }
    }
    this.isOpenModal = false;
    this.selectedNews = undefined;
  }

  OnClickAddButton() {
    this.isOpenModal = true;
  }

  OnCancelModal() {
    this.isOpenModal = false;
    this.selectedNews = undefined;
  }
}
