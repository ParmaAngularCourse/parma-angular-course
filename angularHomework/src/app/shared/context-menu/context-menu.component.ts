import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Position } from '../../model/news-type';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit {

  @Output() selectAll: EventEmitter<number> = new EventEmitter();
  
  isVisible: boolean = false;
  position: Position = {top: 0, left: 0};

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onSelectAll() {
    this.selectAll.emit();
    this.isVisible = false;
  }

  show(param: Position) {
    this.cdr.markForCheck();
    this.position = param;
    this.isVisible = true;
  }

  close() {
    this.cdr.markForCheck();
    this.isVisible = false;
  }
}
