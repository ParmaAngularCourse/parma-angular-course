import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, forkJoin, Subject, switchMap, takeUntil, from, toArray, bufferCount, startWith } from 'rxjs';
import { NewsService } from '../news.service';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { News, NewsType } from './news-types';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit, OnDestroy {

  public search!: FormControl;
  public searchStr: string = '';

  public newsGrid: News[][] = [];

  @ViewChild("contextMenuComponent") private viewContextMenu!: ContextMenuComponent;

  private ngUnsubscribe$: Subject<boolean>;
  private newsTypeFilter: NewsType | null = null;

  constructor(private _newsService: NewsService, private cdr: ChangeDetectorRef,
    private route: ActivatedRoute, private router: Router) {
    this.ngUnsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.search = new FormControl(this.searchStr);
    this.search.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      startWith(''),
      switchMap((value) => {
        return this._newsService.getFilteredNewsList(value, this.newsTypeFilter);
      }),
      switchMap((data) => {
        return from(data).pipe(
          bufferCount(3),
          toArray()
        );
      }),
      takeUntil(this.ngUnsubscribe$)
    )
    .subscribe(
      { next: (data) => {
        this.newsGrid = data;
        this.cdr.markForCheck();
      },
        error: (error: HttpErrorResponse) => { console.log(`${error.status} ${error.message}`); }
      }
    );

    this.route.params
    .pipe(
      switchMap((params) => {
        this.newsTypeFilter = params['type'] ?? null
        return this._newsService.getFilteredNewsList(this.search.value, this.newsTypeFilter);
      }),
      switchMap((data) => {
        return from(data).pipe(
          bufferCount(3),
          toArray()
        );
      }),
      takeUntil(this.ngUnsubscribe$)
    )
    .subscribe(
      { next: (data) => {
        this.newsGrid = data;
        this.cdr.markForCheck();
      },
        error: (error: HttpErrorResponse) => { console.log(`${error.status} ${error.message}`); }
      }
    );
  }

  ngOnDestroy(): void {
      this.ngUnsubscribe$.next(true);
      this.ngUnsubscribe$.complete();
  }

  onRemoveNews($event: number) {
    this._newsService.removeNews($event).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe();
  }

  openAddNewsDialog() {
    this.router.navigate(['', { outlets: { editform: "add-news" } }]);
  }

  hasSelectedNews() {
    return this.newsGrid.flat().some(item => item.selected);
  }
  
  removeSelectedNews() {
    let removeCalls: any[] = this.newsGrid.flat().filter(item => item.selected)
      .map(item => this._newsService.removeNews(item.id));
    forkJoin(removeCalls).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe();
  }

  openEditNewsDialog(newsToEdit: News) {
    this.router.navigate(['', { outlets: { editform: "edit-news/" + newsToEdit.id } }]);
  }

  openContextMenu($event: any) {
    $event.preventDefault();
    this.viewContextMenu.show($event.clientY, $event.clientX);
  }

  hideContextMenu() {
    this.viewContextMenu.hide();
  }

  onSelectAll() {
    this.newsGrid = this.newsGrid.map(row => {
      return row.map(el => { return {...el, selected: true} })
    });
  }
}
