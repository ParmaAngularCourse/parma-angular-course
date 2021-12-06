import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostsService } from '../posts.service';
import { PostsServiceTest } from '../posts.service.test';
import { PostObj } from './post-types';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  public posts: PostObj[] = [];

  private ngUnsubscribe$!: Subject<number>;
  constructor(private _postsService: PostsService) {
    this.ngUnsubscribe$ = new Subject();

    this._postsService.getPosts().pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      (data => this.posts = data),
      (error: HttpErrorResponse) => { console.log(error.status + ' ' + error.message); }
    );
   }

  ngOnInit(): void {
  }

  onAddComment($event: string, id: number) {
    this._postsService.addComment($event, id);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}