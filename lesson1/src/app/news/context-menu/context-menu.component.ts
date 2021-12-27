import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  isVisible: boolean = false;
  position: {top: number, left: number} = {top: 0, left: 0};

  @Output() checkAll: EventEmitter<boolean> = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
  }

  show(newPosition: {top: number, left: number})
  {
    this.isVisible = true;
    this.position = newPosition;
  }

  checkAllClick()
  {
    this.checkAll.emit();
    this.isVisible = false;
  }
}
