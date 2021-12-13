import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent {
  @Output() selectAllItems = new EventEmitter<void>();
  @Input() x = 0;
  @Input() y = 0;

  selectAllHandler() {
    this.selectAllItems.emit();
  }
}
