import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, withLatestFrom, tap } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import * as fromActions from '../actions'
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import { PostObj } from '../../all-posts/post-types';
import { Store, select, props } from '@ngrx/store';
import { EditPostGuard } from '../../shared/guards/edit-post.guard';



@Injectable()
export class PostEffects {

  constructor(private _postService: PostsService,
     private actions$: Actions,
     private store$: Store<fromReducers.State>) {}

     getPosts$ = createEffect(() =>
        this.actions$.pipe(
          ofType(fromActions.actionLoadPosts),
          withLatestFrom(this.store$.pipe(select(fromSelectors.selectorPosts))),
          switchMap(([, _postsObj]) => {
            if (_postsObj) {
              return [fromActions.actionPostsSuccess({ posts: _postsObj})]
            }

            return this._postService.loadPosts().pipe(
              map((_posts: PostObj[]) => {
                if (!_posts) {
                  return fromActions.actionPostsFailure({error: "Ошибка получения даных"});
                }
                return fromActions.actionPostsSuccess({posts: _posts});
              }),
              catchError((err) => {
                return of(fromActions.actionPostsFailure({error: "Ошибка получения даных"}));
              })
            )
          })
        )
     );

     updatePost$ = createEffect(() =>
       this.actions$.pipe(
         ofType(fromActions.actionEditPost),
         switchMap((action) => {
           return this._postService.updatePost(action.editPost).pipe(
             map(()=> fromActions.actionEditPostSuccess({editPost: action.editPost})),
             catchError(err => of(fromActions.actionEditPostFailure({ error: "Ошибка обновления новости"})))
           );
         })
       )
     );

     loadPostsSuccess$ = createEffect(() =>
         this.actions$.pipe(
           ofType(fromActions.actionPostsSuccess),
           map(acition => {
             return fromActions.actionSnackBar({message: "Новости успешно загружены"});
           })
         )
     );

     loadPostFailure$ = createEffect(() =>
           this.actions$.pipe(
             ofType(fromActions.actionPostsFailure),
             map(action => {
               return fromActions.actionSnackBar({message: action.error});
             })
           )
     );

     editPostSuccess$ = createEffect(() =>
             this.actions$.pipe(
               ofType(fromActions.actionEditPostSuccess),
               map(action => {
                 return fromActions.actionSnackBar({message: `Новость c id:${action.editPost.id} успешно обновлена`});
               })
             )
     );

     editPostFailure$ = createEffect(() =>
        this.actions$.pipe(
          ofType(fromActions.actionEditPostFailure),
          map(action => {
            return fromActions.actionSnackBar({message: action.error});
          })
        )
    );

    editPostCancel$ = createEffect(() =>
          this.actions$.pipe(
            ofType(fromActions.actionEditPostCancel),
            map(action => {
              return fromActions.actionSnackBar({message: "Изменение новости отменено"});
            })
          )
    );

}
