import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { PostObj } from "../../models/post-types";
import { PostsService } from "../../services/posts.service";
import * as fromActions from  '../actions';

@Injectable()
export class PostEffects {
    constructor(private _postsService: PostsService, private actions$: Actions) {

    }

    @Effect()
    getPosts$: Observable<Action> = this.actions$.pipe(
        ofType(fromActions.LOAD_POSTS),
        switchMap(() => 
            this._postsService.getPosts().pipe(
                map((_postObjs: PostObj[]) => {                    
                    return new fromActions.LoadPostsSuccess(_postObjs);
                })
            )
        )
    )
}