import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit {

  @Output() selectAll: EventEmitter<boolean> = new EventEmitter()
  public isVisible: boolean = false;
  public position: {top: number, left: number} = {top: 0, left: 0};

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  show(positionTop: number, positionLeft: number) {
    this.position.top = positionTop;
    this.position.left = positionLeft;
    this.isVisible = true;
    this.cdr.markForCheck();
  }

  hide() {
    this.isVisible = false;
    this.cdr.markForCheck();
  }

  select() {
    this.selectAll.emit(true);
    this.isVisible = false;
  }
}
