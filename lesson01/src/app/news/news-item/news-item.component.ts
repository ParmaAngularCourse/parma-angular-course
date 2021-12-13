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

  tag: NewsTag | undefined;

  @Input() newsItem!: NewsItemModel;
  @Output() removeItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() editItem: EventEmitter<NewsItemModel> = new EventEmitter<NewsItemModel>();

  constructor(private _cd: ChangeDetectorRef,
              private _tagListService: TagsListService) {
  }

  ngOnInit(): void {
    this._tagListService.getTagsList().subscribe(
      (data) => {
        this.tag = data.find(p => p.tag == this.newsItem.tag);
        this._cd.detectChanges()
      },
      (error) => {console.log(error)}
    );
  }

  checkboxChange($event: Event){
    this.newsItem.selected = ($event.target as HTMLInputElement).checked;
  }

  remove() {
    this.removeItem.emit(this.newsItem.id);
  }

  edit() {
    this.editItem.emit(this.newsItem);
  }

  setSelected(isSelect: boolean){
    this.newsItem.selected = isSelect;
    this._cd.markForCheck();
  }
}
