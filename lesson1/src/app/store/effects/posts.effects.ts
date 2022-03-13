import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { NewsPost } from 'src/models/NewsPost';
import { NewsService } from '../../../services/newsService';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

@Injectable()
export class PostEffects {
  constructor(
    private _postService: NewsService,
    private actions$: Actions,
    private store$: Store<fromReducers.State>
  ) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadPost),
      withLatestFrom(this.store$.pipe(select(fromSelectors.selectPosts))),
      switchMap(([_, newsObj]) => {
        if (newsObj) fromActions.loadPostSuccess({ news: newsObj });

        return this._postService
          .GetAll()
          .pipe(
            map((news: NewsPost[]) =>
              fromActions.loadPostSuccess({ news: news })
            )
          );
      })
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addNewsPost),
      switchMap((action) => {
        this._postService.Add(action.post);
        console.log('catched success');
        return [fromActions.addNewsPostSuccess({ post: action.post })];
      })
    )
  );
}
