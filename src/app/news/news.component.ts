import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NewsService } from '../news.service';
import { Report } from './news-types';
import { Role } from './roles';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {

  public news!: Report[];
  private ngUnsubscribe$!: Subject<number>;

  constructor(private _newsService: NewsService, private ref: ChangeDetectorRef) {
    this.ngUnsubscribe$ = new Subject();
    this._newsService.getNews().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(((data: any) => { this.news = data; this.ref.markForCheck(); }), (error: HttpErrorResponse) => console.log(error));
  }

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
    this._newsService.deleteCheckedReports();
  }

  saveReport($event: Report) {
    this._newsService.saveReport($event, this.modalIndex);
    this.modal.hide();
  }

  initReport($event: Report, i: number) {
    this.modalIndex = i;
    this.modalHeader = "Изменить новость";
    this.modalData = $event;
    this.modal.show();
  }

  deleteReport(i: number) {
    this._newsService.deleteReport(i);
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

  ngOnDestroy() {
    this.ngUnsubscribe$.next(0);
    this.ngUnsubscribe$.complete();
  }
}
