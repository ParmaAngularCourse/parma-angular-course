import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PostObj } from '../post-types';

@Component({
  selector: 'app-header-post-detail',
  templateUrl: './header-post-detail.component.html',
  styleUrls: ['./header-post-detail.component.css']
})
export class HeaderPostDetailComponent {
  @Input() titleDialog:string = "Наименование заголовка";
  @Output() CloseDialogHeaderEvent: EventEmitter<void> = new EventEmitter();
  private _isVisible: boolean = false;
  get isVisible():boolean  { return this._isVisible;}

  closeDialogHandler() {
    this.CloseDialogHeaderEvent.emit();
  }
  show(isShow:boolean) {
    this._isVisible = isShow;
  }
}
