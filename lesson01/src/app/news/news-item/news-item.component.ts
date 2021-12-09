import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {NewsItemModel, NewsTag} from "../news-types";
import {TagsListService} from "../services/tags-list.service";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {

  isActive: boolean = false;
  tagsList: NewsTag[] = [];
  tag: NewsTag | undefined;

  @Input() newsItem!: NewsItemModel;
  @Output() removeItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() editItem: EventEmitter<NewsItemModel> = new EventEmitter<NewsItemModel>();
  @Output() itemSelected: EventEmitter<{ id: number, isSelected: boolean}> = new EventEmitter<{ id: number, isSelected: boolean}>();
  constructor(public cd: ChangeDetectorRef,
              private _tagListService: TagsListService) {
  }

  ngOnInit(): void {
    this._tagListService.getTagsList().subscribe(
      (data) => {
        this.tagsList = data;
        this.tag = this.tagsList.find(p => p.tag == this.newsItem.tag);
        this.cd.detectChanges()
      },
      (error) => {console.log(error)}
    );
  }

  checkboxChange($event: Event){
    this.isActive = ($event.target as HTMLInputElement).checked;
    this.itemSelected.emit({id: this.newsItem.id, isSelected: this.isActive});
  }

  remove() {
    this.removeItem.emit(this.newsItem.id);
  }

  edit() {
    this.editItem.emit(this.newsItem);
  }

  setSelected(isSelect: boolean){
    this.isActive = isSelect;
    this.itemSelected.emit({id: this.newsItem.id, isSelected: this.isActive});
    this.cd.markForCheck();
  }
}
