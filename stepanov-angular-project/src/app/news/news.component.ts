import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

  public items: NewsPart[];

  public edit_item!: NewsPart;

  public newsTypeValues: typeof NewsType = NewsType;

  public isAnyItemSelected: boolean = false;

  constructor() 
  {
    this.items = 
    [
      new NewsPart(0, new Date(2020,1,20,10,52,30), 'Погода', 'В ближайшие дни ожидается мокрый дождь со снегом', NewsType.Internet),
      new NewsPart(1, new Date(2021,2,12,8,19,56), 'Работа', 'Корпоративу на НГ - быть!', NewsType.Tourism),
      new NewsPart(2, new Date(2022,3,16,20,11,9), '.NET', 'Вышел новый подкаст на тему ".net 6"', NewsType.Science)
    ]
  }

  @ViewChild('newsMaker') newsModalComponent!: NewsMakerComponent;
  @ViewChild('contextMenu') contextMenuComponent!: NewsContextMenuComponent;
  @ViewChildren('newsItems') newsItems!: QueryList<NewsItemComponent>
  ngOnInit(): void {
  }

  deleteNewsItem($event: number) {
    var removingIndex = this.items.findIndex(item => item.id == $event);
    this.items.splice(removingIndex, 1);
  }

  editNewsItem($event: NewsPart) {
    this.edit_item = new NewsPart($event.id, $event.date, $event.title, $event.text, $event.type);
    this.showNewsMakerModalWindow();
  }

  addNewItem() {
    this.edit_item = new NewsPart(null, new Date(), '', '', NewsType.Politics);
    this.showNewsMakerModalWindow()
  }

  showNewsMakerModalWindow() {
    this.newsModalComponent.setVisibility(true);
  }

  closeNewsMakerModalWindow() {
    this.newsModalComponent.setVisibility(false);
  }

  saveNewItem() {
    if(this.edit_item.id == null) {
      this.edit_item.id = this.findMaxId() + 1;
      this.items.push(this.edit_item);
    } else {
      var foundItemIndex = this.items.findIndex(item => item.id == this.edit_item.id);
      this.items[foundItemIndex] = this.edit_item;
    }
  }

  findMaxId() : number {
    var maxId = -1;
    this.items.forEach(item => {
      var currentId = item.id!;
      if(currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
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
}