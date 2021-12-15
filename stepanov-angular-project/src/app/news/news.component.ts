import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NewsService } from '../services/news.service';
import { UserRights } from './i-user-types';
import { NewsContextMenuComponent } from './news-context-menu/news-context-menu.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { NewsMakerComponent } from './news-maker/news-maker.component';
import { NewsPart, NewsType } from './news-types';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  private readonly newsSub: Subscription;
  public items!: NewsPart[];
  public edit_item!: NewsPart;
  public newsTypeValues: typeof NewsType = NewsType;
  public isAnyItemSelected: boolean = false;
  public curUserRights!: UserRights;

  constructor(private readonly newsService: NewsService,
              private readonly authService: AuthService) 
  {
    this.newsSub = newsService
        .getAllNewsItems()
        .subscribe
        (
          items => this.items = items,
          (error: HttpErrorResponse) => { console.log(error.status + ' ' + error.message); }
        );
  }

  @ViewChild('newsMaker') newsModalComponent!: NewsMakerComponent;
  @ViewChild('contextMenu') contextMenuComponent!: NewsContextMenuComponent;
  @ViewChildren('newsItems') newsItems!: QueryList<NewsItemComponent>
  ngOnInit(): void {
    let curUser = this.authService.getCurrentUser();
    this.curUserRights = curUser.rights;
  }

  deleteNewsItem($event: number) {
    this.newsService.removeNewsItem($event);
  }

  editNewsItem($event: NewsPart) {
    this.edit_item = new NewsPart($event.id, $event.date, $event.title, $event.text, $event.type);
    this.showNewsMakerModalWindow();
  }

  addNewItem() {
    this.edit_item = new NewsPart(null, new Date(), '', '', NewsType.Politics);
    this.showNewsMakerModalWindow();
  }

  showNewsMakerModalWindow() {
    this.newsModalComponent.setVisibility(true);
  }

  closeNewsMakerModalWindow() {
    this.newsModalComponent.setVisibility(false);
  }

  saveNewItem() {
    if(this.edit_item.id == null) {
      this.newsService.addNewsItem(this.edit_item);
    } else {
      this.newsService.editNewsItem(this.edit_item);
    }
  }

  onTextChanged($event: string) {
    this.edit_item.text = $event;
  }

  onTitleChanged($event: string) {
    this.edit_item.title = $event;
  }

  tryParseDate($event: string) {
    if ($event) {
        this.edit_item.date = new Date($event);
    } else {
        this.edit_item.date = new Date();
    }
    this.edit_item.localDateStr = this.edit_item.createDateLocal();
  }

  onNewsTypeInputChange(value: string) {
    this.edit_item.type = value as NewsType;
  }

  selectAllNewsItems($event: Event) {
    this.newsItems.forEach(item => item.onSelectChanged(true));        
  }

  showContextMenu($event: MouseEvent) {
    $event.preventDefault();
    this.contextMenuComponent.showMenu({top: $event.clientY, left: $event.clientX});
  }

  onSelectItem($event: NewsPart) {
    this.isAnyItemSelected = this.items.filter(item => item.isChecked).length > 0;
  }

  deleteItems() {
    if (this.isAnyItemSelected) {
      this.items
          .filter(item => item.isChecked)
          .forEach(item => this.deleteNewsItem(item.id!));
    }
    
    this.isAnyItemSelected = false;
  }

  ngOnDestroy() {
    this.newsSub.unsubscribe();
  }
}
