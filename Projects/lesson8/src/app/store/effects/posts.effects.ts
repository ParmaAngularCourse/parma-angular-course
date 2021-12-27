import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import { PostObj } from "../../models/post-types";
import { PostsService } from "../../services/posts.service";
import * as fromActions from  '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

@Injectable()
export class PostEffects {
    constructor(private _postsService: PostsService, private actions$: Actions, private store$: Store<fromReducers.State>) {}

    getPosts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromActions.loadPosts),
            withLatestFrom(this.store$.pipe(select(fromSelectors.selectPostsLoad))),
            filter(([, allLoad]) => !allLoad),
            switchMap(() => 
                {
                    return this._postsService.getPosts().pipe(
                        map((_postObjs: PostObj[]) => {                    
                            return fromActions.loadPostsSuccess({ posts: _postObjs});
                        })
                    )
                }
            )
        )
    )
    
    addComment$  =createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.addComment),
            switchMap(action => {
                this._postsService.addComment(action.comment, action.id);
                return [fromActions.addCommentSuccess(action)];
            })
        )
    )

    addCommentSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(fromActions.addCommentSuccess),
                map(action => {
                    return fromActions.addSnackBarMessage({message: "Комментарий добавлен"})
                })
            )
    )

    addCommentReset$ = createEffect(() =>
            this.actions$.pipe(
                ofType(fromActions.addCommentReset),
                map(action => {
                    return fromActions.addSnackBarMessage({message: "Действие отменено"})
                })
            )
    )    
}