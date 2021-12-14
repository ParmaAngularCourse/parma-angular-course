import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWindowComponent implements OnInit {

  @Output() modalClose : EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.modalClose.emit();
  }
}
