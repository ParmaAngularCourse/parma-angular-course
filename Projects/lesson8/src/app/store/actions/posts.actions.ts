import { createAction, props } from "@ngrx/store";
import { PostObj } from "../../models/post-types";

export const loadPosts = createAction(
    '[Post List] Load Posts'
);

export const loadPostsSuccess = createAction(
    '[Post List] Load Posts Success',
    props<{ posts: PostObj[] }>()
);

export const addComment = createAction(
    '[Post List] Add Comment',
    props<{ comment: string, id: number }>()
);

export const addCommentSuccess = createAction(
    '[Post List] Add Comment Success',
    props<{ comment: string, id: number }>()
);

export const addCommentReset = createAction(
    '[Post List] Add Comment Reset'
);