import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {
  @Output() selectAllItems: EventEmitter<void> = new EventEmitter();
  @Input() x = 0;
  @Input() y = 0;
  
  selectAllHandler() {
    this.selectAllItems.emit();
  }
}
