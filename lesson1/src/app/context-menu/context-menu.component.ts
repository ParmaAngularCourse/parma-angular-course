import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { positionType } from '../news/news-types';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  @Output() selectAll: EventEmitter<void> = new EventEmitter();

  isVisible: boolean = false;
  position: positionType = {top: 0, left: 0};
  constructor() { }

  ngOnInit(): void {
  }

  show(pos: positionType ){
    this.isVisible = true;
    this.position = pos;
  }

  hide(){
    this.isVisible = false;
  }

  clickSelectAll(){
    this.isVisible = false;
    this.selectAll.emit();
  }

}
