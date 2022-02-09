import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserPermissions } from '../../model/userPermissions';
import { UserAuthService } from '../../user-authservice';
import { News } from '../../model/news-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-news-modal-content',
  templateUrl: './news-modal-content.component.html',
  styleUrls: ['./news-modal-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsModalContentComponent implements OnInit {

  
  public title: string = '';
  private _news: News | undefined;

  readonly currUser: UserPermissions;

  newsForm!: FormGroup;

  @Input()
  get news(): News | undefined { return this._news}
  set news(_news: News | undefined) {
    this._news = _news;
    this.title = this._news && this._news.id != 0 ? "изменить новость" : "Добавить новость";
  }

  @Output() saveNews: EventEmitter<News> = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  constructor(private _userAuthService: UserAuthService, private fb: FormBuilder) { 
    this.currUser = this._userAuthService.getUserPermissions();
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.newsForm = this.fb.group({
      date: [this.news?.dateTime, [Validators.required]],
      title: [this.news?.title, [Validators.required]],
      text: [this.news?.text, [Validators.required]],
      newsType: [this.news?.newsType],
    })

    this.newsForm.valueChanges.pipe(filter(() => this.newsForm.valid)).subscribe((value) =>
      {        
        this.news = {
          id: this.news ? this.news.id : 0,
          title: value['title'],
          text: value['text'],
          dateTime: value['date'],
          newsType: value['newsType'],
        };
      }
    );
  }

  clickSaveNews() {
    this.saveNews.emit(this.news);
  }

  clickCancel() {
    this.cancel.emit();
  }
}
