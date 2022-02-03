import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Output() clickIsRedirectUserEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  yesDialogHandler() {
    this.clickIsRedirectUserEvent.emit(true);
  }

  noDialogHandler() {
    this.clickIsRedirectUserEvent.emit(false);
  }

}
