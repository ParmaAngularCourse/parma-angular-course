import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Report } from './news-types';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {

  public news: Report[] = [{
      header: "Внимание!",
      body: "Произошло непоправимое. Я проснулась",
      timestamp: "10.11.2021",
      isChecked: false
    },
    {
      header: "НОВОСТЬ",
      body: "Внимание-внимание! Я забыла мысль",
      timestamp : "17.11.2021",
      isChecked: false
    },
    {
      header: "...",
      body: "Что?",
      timestamp: "22.11.2021",
      isChecked: true
    },
    {
      header: "Невнимание",
      body: "Сегодня нормально",
      timestamp: "23.11.2021",
      isChecked: false
    }]

  isModalVisible = false;
  modalIndex!: number;
  modalData!: Report;

  clickAddButton() {
    this.modalIndex = this.news.length;
    this.isModalVisible = true;
    this.modalData = {
      header: "",
      body: "",
      timestamp: "",
      isChecked: false
    };
  }

  saveReport($event: Report) {
    this.isModalVisible = false;
    if (this.modalIndex < this.news.length)
      this.news[this.modalIndex] = $event;
    else
      this.news.push($event);
  }

  initReport($event: Report, i: number) {
    this.modalIndex = i;
    this.isModalVisible = true;
    this.modalData = $event;
  }

  deleteReport(i: number) {
    this.news.splice(i, 1);
  }
}
