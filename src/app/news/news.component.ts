import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NewsType, Report } from './news-types';
import { Role } from './roles';

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
    timestamp: "2021-11-10",
    isChecked: false,
    type: NewsType.Politics
  },
  {
    header: "НОВОСТЬ",
    body: "Внимание-внимание! Я забыла мысль",
    timestamp: "2021-11-17",
    isChecked: false,
    type: NewsType.Science
  },
  {
    header: "...",
    body: "Что?",
    timestamp: "2021-11-22",
    isChecked: true,
    type: NewsType.Tourism
  },
  {
    header: "Невнимание",
    body: "Сегодня нормально",
    timestamp: "2021-11-23",
    isChecked: false,
    type: NewsType.Internet
  }]

  @ViewChild('modal') modal!: ModalComponent;

  modalIndex!: number;
  modalData!: Report;
  modalHeader!: string;
  isContextMenuVisible = false;
  contextMenuPosition: { left: number, top: number; } = { left: 0, top: 0 };
  roleEnum = Role;

  clickAddButton() {
    this.modalIndex = this.news.length;
    this.modalHeader = "Добавить новость";
    this.modalData = {
      header: "",
      body: "",
      timestamp: "",
      isChecked: false,
      type: null
    };
    this.modal.show();
  }

  clickDeleteButton() {
    this.news = this.news.filter(x => !x.isChecked);
  }

  saveReport($event: Report) {
    if (this.modalIndex < this.news.length)
      this.news[this.modalIndex] = $event;
    else
      this.news.push($event);
    this.modal.hide();
  }

  initReport($event: Report, i: number) {
    this.modalIndex = i;
    this.modalHeader = "Изменить новость";
    this.modalData = $event;
    this.modal.show();
  }

  deleteReport(i: number) {
    this.news.splice(i, 1);
  }

  rightClick(e: { clientX: any; clientY: any; }) {
    this.contextMenuPosition.left = e.clientX;
    this.contextMenuPosition.top = e.clientY;
    this.isContextMenuVisible = !this.isContextMenuVisible;
    return false;
  }

  noOneChecked() {
    return this.news.every(x => !x.isChecked);
  }

  clickCheckAllButton() {
    return this.news.forEach(x => x.isChecked = true);
  }
}
