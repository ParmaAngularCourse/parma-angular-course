import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, Observable, switchMap } from "rxjs";
import { Information } from "src/app/news/news-types";
import { PostsService } from "src/app/news/posts.service";
import * as formActions from "../actions";

@Injectable()
export class PostEffects{

    constructor(private _postService: PostsService, private actions$: Actions){

    }
    @Effect()

    getPosts$: Observable<Action> = this.actions$.pipe(
        ofType(formActions.LOAD_POSTS),
        //map((action: formActions.LoadPosts)=> action.payload),
        
        switchMap((action: formActions.LoadPosts) => 
        this._postService.getPosts(action.payload.titleValue, action.payload.newsTypeValue).pipe(
            map((_postObj: Information[])=> {
                return new formActions.LoadPostsSuccess(_postObj);
            })
        ))
    )




}