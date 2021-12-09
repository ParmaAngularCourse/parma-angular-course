import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Position } from '../news-type';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  @Output() selectAllNews: EventEmitter<number> = new EventEmitter();
  
  isVisible: boolean = false;
  position: Position = {top: 0, left: 0};

  constructor() { }

  ngOnInit(): void {
  }

  onSelectAll() {
    this.selectAllNews.emit();
    this.isVisible = false;
  }

  show(param: Position) {
    this.position = param;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
