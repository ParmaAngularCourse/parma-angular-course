import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserPermissions } from '../../model/userPermissions';
import { UserAuthService } from '../../user-authservice';
import { News } from '../../model/news-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { ChangeEditNewsService } from '../services/change-edit-news.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-modal-content',
  templateUrl: './news-modal-content.component.html',
  styleUrls: ['./news-modal-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsModalContentComponent implements OnInit {

  public title: string = '';

  readonly currUser: UserPermissions;

  newsForm!: FormGroup;

  private news!: News;
  
  constructor(private _userAuthService: UserAuthService, 
    private fb: FormBuilder,
    private _changeEditService: ChangeEditNewsService,
    private _router: Router,
    private _route: ActivatedRoute) { 
    this.currUser = this._userAuthService.getUserPermissions();
  }

  ngOnInit(): void {

    var selectedNewsId = this._route.snapshot.queryParams["newsId"];
    console.log("on init", selectedNewsId);

    this.news = this._changeEditService.getSelectedNews(selectedNewsId);
    this.title = this.news && this.news.id != 0 ? "изменить новость" : "Добавить новость";

    this.newsForm = this.fb.group({
      date: [this.news?.dateTime ?? new Date()],
      title: [this.news?.title ?? "", [Validators.required]],
      text: [this.news?.text ?? "", [Validators.required]],
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
    if (this.news)
        this._changeEditService.$safe.next(this.news);
  }

  clickCancel() {
    this._router.navigate([{outlets: {modal: null}}]);
  }
}
