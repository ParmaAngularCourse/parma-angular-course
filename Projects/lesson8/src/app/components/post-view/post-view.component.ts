import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import * as fromStore from '../../store';

import { PostObj } from '../../models/post-types';
//import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent {
  post?: PostObj | null = null;
  private ngUnsubscribe$ = new Subject();

  constructor(/*private _postsService: PostsService, */private route: ActivatedRoute, private store: Store<fromStore.State>) {    
    this.store.pipe(
      select(fromStore.selectPostsLoad),
      tap(value => !value && this.store.dispatch(fromStore.loadPosts())),
      filter(value => value),
      withLatestFrom(this.store.pipe(select(fromStore.getSelectedPost))),
      //map(([, posts]) => posts.find(item => item.id === Number(route.snapshot.paramMap.get('postId')))),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      ([, value]) => {
        this.post = value;
      }
    );
    
    /*_postsService.getPost(Number(route.snapshot.paramMap.get('postId'))).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      (value) => {
        this.post = value;
      }
    );*/
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }  
}
