import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-news-item-modal',
  templateUrl: './news-item-modal.component.html',
  styleUrls: ['./news-item-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemModalComponent implements OnInit {

  @Output() save : EventEmitter<void> = new EventEmitter<void>();
  isVisible: boolean = false;

  constructor(public cd : ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  show() {
    this.isVisible = true;
    this.cd.markForCheck();
  }

  cancel() {
    this.isVisible = false;
  }

  saveItem() {
    this.save.emit();
    this.isVisible = false;
  }
}
