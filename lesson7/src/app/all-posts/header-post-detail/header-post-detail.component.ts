import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PostObj } from '../post-types';

@Component({
  selector: 'app-header-post-detail',
  templateUrl: './header-post-detail.component.html',
  styleUrls: ['./header-post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderPostDetailComponent {
  @Input() titleDialog:string = "Наименование заголовка";
  @Output() closeDialogHeaderEvent: EventEmitter<void> = new EventEmitter();
  @Output() closePopupEvent = new EventEmitter<void>();
  private _isVisible: boolean = false;
  get isVisible():boolean {
    return this._isVisible;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  closeDialogHandler() {
    this.closeDialogHeaderEvent.emit();
  }
  show(isShow:boolean) {
    this._isVisible = isShow;
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  ngDoCheck() {
    console.log('header-post-detail');
  }

  closePopupHandler(){
    this.closePopupEvent.emit();
  }
}
