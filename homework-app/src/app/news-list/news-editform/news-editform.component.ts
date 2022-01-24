import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { News, NewsType } from '../news-types';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/news.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-news-editform',
  templateUrl: './news-editform.component.html',
  styleUrls: ['./news-editform.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsEditformComponent implements OnInit {

  public showEditForm: boolean = true;
  public news!: News;
  public editForm!: FormGroup;

  private ngUnsubscribe$: Subject<boolean>;
  private newsId: number | null = null;
  private allNews: News[] = [];

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute,
    private _newsService: NewsService) { 
    this.ngUnsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      date: [this.getDateString(new Date()), [Validators.required]],
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      type: [NewsType.Politics, [Validators.required]]
    });

    this.route.params
    .pipe(
      switchMap((params) => {
        this.newsId = params['id'] ?? null;
        this.showEditForm = !!this.newsId;
        return this._newsService.getNewsList();
      }),
      takeUntil(this.ngUnsubscribe$)
    )
    .subscribe(
      { next: (data) => {
          this.allNews = data
          const newsById = data.find(n => n.id == this.newsId);
          if(newsById) {
            this.news = newsById;
            this.editForm?.setValue({
              date: this.getDateString(this.news.date),
              title: this.news.title,
              text: this.news.text,
              type: this.news.type
            }, {emitEvent: false});
          }
        },
        error: (error: HttpErrorResponse) => { console.log(`${error.status} ${error.message}`); }
      }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  save() {
    //this.router.navigate(['', { outlets: { editform: null } }]).then(value => {
      const newsToSave = {
        ...this.news,
        ...this.editForm.value
      };
      if(this.newsId) {
        this._newsService.updateNews(newsToSave).pipe(
          takeUntil(this.ngUnsubscribe$)
        ).subscribe(v => {
          this.cdr.markForCheck();
          this.router.navigate(['', { outlets: { editform: null } }])
        });
      }
      else {
        newsToSave.id = Math.max(...(this.allNews.map(el => el.id))) + 1;
        this._newsService.addNews(newsToSave).pipe(
          takeUntil(this.ngUnsubscribe$)
        ).subscribe(v => {
          this.cdr.markForCheck();
          this.router.navigate(['', { outlets: { editform: null } }])
        });
      }
   // })
  }

  close() {
    this.cdr.markForCheck();
    this.router.navigate(['', { outlets: { editform: null } }]);
  }

  getDateString(date: Date) : string {
    return (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, -8)
  }
}
