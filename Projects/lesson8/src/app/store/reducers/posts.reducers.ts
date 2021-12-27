import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import { PostObj } from "../../models/post-types";
import * as fromActions from  '../actions';

export interface PostState extends EntityState<PostObj> {
    allLoaded: boolean
}

export const adapter: EntityAdapter<PostObj> = createEntityAdapter<PostObj>({
    selectId: obj => obj.id,
    sortComparer: (a: PostObj, b: PostObj) => a.id - b.id
});

const initialState: PostState = adapter.getInitialState({
    allLoaded: false
});

const postsReducer = createReducer(
    initialState,
    //on(fromActions.loadPosts, (state) => ({ ...state })),
    on(fromActions.loadPostsSuccess, (state, { posts }) => { return adapter.setAll(posts, { ...state, allLoaded: true }) } /*({ ...state, posts: posts })*/),
    on(fromActions.addCommentSuccess, (state, { comment, id }) => 
        {
            const comments = state.entities[id]?.comments || [];
            return adapter.updateOne({
                id: id,
                changes: {
                    comments: [ ...comments, {commentText: comment}]
                }
            }, state)
        }
    
    /*(
        { ...state, 
          posts: state.posts?.map(
              post => {
                  if (post.id === id) {
                      return {
                          ...post,
                          comments: [...post.comments, {commentText: comment}]
                      }
                  }
                  else {
                      return post
                  }
              }
          )
        }
    )*/)
)

export function reducer(state: PostState | undefined, action: Action): PostState {
    return postsReducer(state, action)
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

/*
[{id: 1, name: 'Имя1'},
{id: 2, name: 'Имя2'},
{id: 3, name: 'Имя3'}]

entities = {
1: {id: 1, name: 'Имя1'},
2: {id: 2, name: 'Имя2'},
3: {id: 3, name: 'Имя3'}
}

state.entities[2]

{
ids: [1, 2, 3],
entities: {
1: {id: 1, name: 'Имя1'},
2: {id: 2, name: 'Имя2'},
3: {id: 3, name: 'Имя3'}
}}

*/