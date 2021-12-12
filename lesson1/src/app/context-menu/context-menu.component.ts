import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {

  constructor() { }
  @Input() x = 0;
  @Input() y = 0;

  @Output() selectAll = new EventEmitter<void>();

  onClick() {
    this.selectAll.emit();
  }
}
