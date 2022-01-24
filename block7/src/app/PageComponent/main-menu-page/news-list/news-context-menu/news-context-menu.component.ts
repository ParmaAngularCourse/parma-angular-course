import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-context-menu',
  templateUrl: './news-context-menu.component.html',
  styleUrls: ['./news-context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsContextMenuComponent implements OnInit {
  public isVisible:boolean = false;
  public menuTopLeftPosition: { top: number, left: number} =  {top: 0, left: 0};

  constructor(private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  showMenu(event: MouseEvent){
    this.isVisible = true;
    this.menuTopLeftPosition.top = event.clientY;
    this.menuTopLeftPosition.left = event.clientX;
    this.cd.markForCheck();    
  }

  closeMenu(event?:Event|undefined) {
    if(event){
      event.preventDefault()
    }
    this.isVisible = false;
    this.cd.markForCheck();
  }

  ngDoCheck(){
    console.log('app-news-context-menu');
  }
}
