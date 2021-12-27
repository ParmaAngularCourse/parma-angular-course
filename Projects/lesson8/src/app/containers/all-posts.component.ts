import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
//import { PostsService } from '../services/posts.service';
import { PostObj } from '../models/post-types';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';

import { select, Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {

  //@ViewChild('SnackBar') SnackbarComponent?: SnackbarComponent;
  public posts$!: Observable<PostObj[] | undefined>;
  public count$!: Observable<number | undefined>;
  public countWithoutWords$!: Observable<number>;  

  //private ngUnsubscribe$ = new Subject();
  constructor(/*private _postsService: PostsService,*/
    private store: Store<fromStore.State>) {
      /*this._postsService.getPosts().pipe(
        takeUntil(this.ngUnsubscribe$)
      ).subscribe(results => this.store.dispatch(new fromStore.LoadPostsSuccess(results)));*/
    
      this.store.dispatch(fromStore.loadPosts());

      this.posts$ = this.store.pipe(select(fromStore.selectPosts));
      this.count$ = this.store.pipe(select(fromStore.selectPostsCount));
      this.countWithoutWords$ = this.store.pipe(select(fromStore.selectPostsWithoutDolorCount));      
    
    /*this._postsService.getPosts().pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      (data => this.posts = data),
      (error: HttpErrorResponse) => { console.log(error.status + ' ' + error.message); }
    );*/
   }

  onAddComment($event: string, id: number) {    
    //this._postsService.addComment($event, id);
    this.store.dispatch(fromStore.addComment({ comment: $event, id }));
    //this.SnackbarComponent?.show("Комментарий добавлен");
  }

  onResetChange() {
    //this.SnackbarComponent?.show("Действие отменено");
    this.store.dispatch(fromStore.addCommentReset());
  }

  ngOnDestroy() {
    /*this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();*/
  }
}