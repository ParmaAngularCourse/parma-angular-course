import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-context-menu',
  templateUrl: './news-context-menu.component.html',
  styleUrls: ['./news-context-menu.component.css']
})
export class NewsContextMenuComponent implements OnInit {
  public isVisible:boolean = false;
  public menuTopLeftPosition: { top: number, left: number} =  {top: 0, left: 0};

  constructor() { }

  ngOnInit(): void {
  }

  showMenu(event: MouseEvent){
    this.isVisible = true;
    this.menuTopLeftPosition.top = event.clientY;
    this.menuTopLeftPosition.left = event.clientX;    
  }

  closeMenu() {
    this.isVisible = false;
  }
}
