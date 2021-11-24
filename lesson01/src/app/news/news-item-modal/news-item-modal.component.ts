import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-news-item-modal',
  templateUrl: './news-item-modal.component.html',
  styleUrls: ['./news-item-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemModalComponent implements OnInit {

  @Output() close : EventEmitter<void> = new EventEmitter<void>();
  @Output() save : EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.close.emit();
  }

  saveItem() {
    this.save.emit();
    this.close.emit();
  }
}
