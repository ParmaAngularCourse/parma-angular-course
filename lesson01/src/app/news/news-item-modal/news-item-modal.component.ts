import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Permission, Permissions} from "../news-types";

@Component({
  selector: 'app-news-item-modal',
  templateUrl: './news-item-modal.component.html',
  styleUrls: ['./news-item-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemModalComponent implements OnInit {

  @Output() save : EventEmitter<void> = new EventEmitter<void>();
  isVisible: boolean = false;
  perms: Permission[] = Permissions;

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
    this.isVisible = false;
    this.save.emit();
  }
}
