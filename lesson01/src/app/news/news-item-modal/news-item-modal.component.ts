import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-news-item-modal',
  templateUrl: './news-item-modal.component.html',
  styleUrls: ['./news-item-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemModalComponent implements OnInit {

  @Output() save : EventEmitter<void> = new EventEmitter<void>();
  isShow: boolean = false;

  constructor(public cd : ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  show() {
    this.isShow = true;
    this.cd.markForCheck();
  }

  cancel() {
    this.isShow = false;
  }

  saveItem() {
    this.save.emit();
    this.isShow = false;
  }
}
