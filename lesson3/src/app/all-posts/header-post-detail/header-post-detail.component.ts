import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-post-detail',
  templateUrl: './header-post-detail.component.html',
  styleUrls: ['./header-post-detail.component.css']
})
export class HeaderPostDetailComponent {
  @Input() titleDialog:string = "Наименование заголовка";
  @Output() CloseDialogHeader: EventEmitter<void> = new EventEmitter();

  closeDialog() {
    this.CloseDialogHeader.emit();
  }
}
