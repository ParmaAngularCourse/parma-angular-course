import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  @Output() checkAll = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  isVisible: boolean = false;
  position: {top: number, left: number} = {top: 0, left: 0};

  show(param: {top: number, left: number}){
        this.isVisible = true;
        this.position = param;
  }

  close(){
    this.isVisible=false;
  }

  onCheckAll() {
    this.checkAll.emit();
  }

}
