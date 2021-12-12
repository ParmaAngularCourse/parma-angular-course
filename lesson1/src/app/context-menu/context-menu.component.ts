import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent  {

  @Output() checkEverything = new EventEmitter<void>();

  isVisible: boolean = false;
  position: {top: number, left: number} = {top: 0, left: 0};

  constructor(private cd: ChangeDetectorRef) {

  }

  show(param: {top: number, left: number})
  {
    this.isVisible = true;
    this.position = param;
    this.cd.markForCheck();
  }

  onCheckEverything() {
    this.isVisible = false;
    this.cd.markForCheck();
    this.checkEverything.emit();
  }
}
