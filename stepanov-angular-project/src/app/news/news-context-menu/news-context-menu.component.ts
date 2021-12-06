import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-news-context-menu',
  templateUrl: './news-context-menu.component.html',
  styleUrls: ['./news-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsContextMenuComponent implements OnInit {
  public isVisible: boolean = false;
  public position: {top: number, left: number} = {top: 0, left: 0};

  @Output()
  onSelectAllItems: EventEmitter<Event> = new EventEmitter();
  
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  showMenu(position: {top: number, left: number}) {
    this.position = position;
    this.isVisible = true;
    this.cdr.markForCheck();
  }

  selectAllItems() {
    this.onSelectAllItems.emit();
    this.HideMenu();
  }

  selectMenuOut() {
    this.HideMenu();
  }

  private HideMenu() {
    this.isVisible = false; 
    this.cdr.markForCheck();   
  }
}
