import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {
  isVisible: boolean = false;
  position: { top: number, left: number } = {top: 0, left: 0};

  @Output() selectAll: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  show(point: { top: number, left: number }){
    this.isVisible = true;
    this.position = point;
  }

  onSelectItem($event: MouseEvent) {
    this.selectAll.emit();
    this.isVisible = false;
  }

  onClickToSub() {
    this.isVisible = false;
  }
}
