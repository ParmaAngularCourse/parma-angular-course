import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  @Output() selectAll: EventEmitter<boolean> = new EventEmitter()
  public isVisible: boolean = false;
  public position: {top: number, left: number} = {top: 0, left: 0};
  constructor() { }

  ngOnInit(): void {
  }

  show(positionTop: number, positionLeft: number) {
    this.position.top = positionTop;
    this.position.left = positionLeft;
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  select() {
    this.selectAll.emit(true);
    this.isVisible = false;
  }
}
