import {ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NewsItemModel, NewsTag, TagsList, Permissions, Permission} from "./news-types";
import {NewsItemModalComponent} from "./news-item-modal/news-item-modal.component";
import {ContextMenuComponent} from "./context-menu/context-menu.component";
import {NewsItemComponent} from "./news-item/news-item.component";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  news: NewsItemModel[] = [
    new NewsItemModel(1, new Date(2021, 0, 1, 0, 0, 1),
      "новость #1", "Текст новости #1", "politic"),
    new NewsItemModel(2, new Date(2021, 1, 1, 0, 0, 2),
      "Новость #2", "Текст новости #2","internet"),
    new NewsItemModel(3, new Date(2021, 2, 1, 0, 0, 3),
      "Новость #3", "Текст новости #3", "science"),
    new NewsItemModel(4, new Date(2021, 3, 1, 0, 0, 4),
      "Новость #4", "Текст новости #4", "tourism")
  ];
  tagsList: NewsTag[] = TagsList;
  perms: Permission[] = Permissions;

  @ViewChild('modalComponent') modal! : NewsItemModalComponent;
  editedItem!: NewsItemModel;

  @ViewChild('contextMenuComponent') menuComponent! : ContextMenuComponent;
  @ViewChildren(NewsItemComponent) newsItemComponents!: QueryList<NewsItemComponent>;
  selectedItemsIds: number[] = [];
  get isSomeItemSelected(): boolean {
    return this.selectedItemsIds.length > 0;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.editedItem = new NewsItemModel(-1, new Date(), "" , "", "");
  }

  onRemoveItem($event: number) {
    let index = this.news.findIndex(p => p.id == $event);
    if(index > -1) {
      this.news.splice(index, 1);
      this.selectedItemsIds = this.selectedItemsIds.filter(p => p != $event);
    }
  }

  onEditItem($event: NewsItemModel) {
    this.editedItem = new NewsItemModel($event.id, $event.date, $event.head, $event.desc, $event.tag);
    this.modal.show();
  }

  onAdd() {
    this.editedItem = new NewsItemModel(-1, new Date(), "" , "", "");
    this.modal.show();
  }

  onDateChange(value: string) {
    this.editedItem.date = new Date(value);
  }

  onHeadChange(value: string) {
    this.editedItem.head = value;
  }

  onDescChange(value: string) {
    this.editedItem.desc = value;
  }

  onTagsChange(value: string) {
    this.editedItem.tag = value;
  }

  onSaveModal() {
    if(this.editedItem.id > 0) {
      let index = this.news.findIndex(p => p.id == this.editedItem.id);
      this.news[index] = this.editedItem;
    } else {
      let maxId = this.news
        .map((v) => { return v.id;})
        .sort()[this.news.length - 1];
      maxId = maxId == undefined ? 1 : maxId;
      this.editedItem.id = maxId + 1;
      this.news.push(this.editedItem);
    }
  }

  onContextMenu($event: MouseEvent) {
    if($event.button == 2) {
      $event.preventDefault();
      this.menuComponent.show({
        top: $event.clientY,
        left: $event.clientX
      });
    }
  }

  onSelectAll() {
    this.newsItemComponents.forEach(p => p.setSelected(true));
  }

  onDeleteSelected() {
    this.selectedItemsIds.forEach(id => {
        this.onRemoveItem(id);
      });
    this.selectedItemsIds = [];
  }

  onItemSelected($event: {id:number, isSelected: boolean}) {
    if($event.isSelected)
    {
      if(!this.selectedItemsIds.includes($event.id)){
        this.selectedItemsIds.push($event.id);
      }
    } else {
      this.selectedItemsIds = this.selectedItemsIds.filter(p => p != $event.id);
    }
  }
}
