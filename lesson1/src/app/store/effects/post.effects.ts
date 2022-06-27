import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Information } from "src/app/news/news-types";
import { PostsService } from "src/app/news/posts.service";
import * as formActions from "../actions";
import * as formReducers from "../reducers";
import * as formSelectors from "../selectors";


@Injectable()
export class PostEffects{

    constructor(private _postService: PostsService, private actions$: Actions, private store$: Store<formReducers.State>){

    }

    getPosts$ = createEffect(()=> 
            this.actions$.pipe(
                ofType(formActions.LoadPosts),
                withLatestFrom(this.store$.pipe(select(formSelectors.selectPosts))),                
                switchMap(([action, _postObj]) => 
                    {
                        /*
                        // кэш данных
                        if(_postObj){
                            return [formActions.LoadPostsSuccess({posts: _postObj})];
                        }*/

                        return this._postService.getPosts(action.searchData.titleValue, action.searchData.newsTypeValue).pipe(
                            map((_postObj: Information[])=> {
                                return formActions.LoadPostsSuccess({posts: _postObj});
                            }))
                    }
                )
            )
    ) 

    savePost$ = createEffect(() =>
                    this.actions$.pipe(
                        ofType(formActions.addPost),
                        switchMap(action => {
                            this._postService.savePost(action.post);
                            return [formActions.addPostSuccess(action)];
                        })
                    )
    )




}