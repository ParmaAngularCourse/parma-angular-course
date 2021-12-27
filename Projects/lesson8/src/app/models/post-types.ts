export interface PostObj {
    id: number,
    title: string,
    text: string,
    comments: CommentObj[]
  }

  export interface CommentObj {
    commentText: string
  }


/*
  export interface PostObjRedux {
    id: number,
    title: string,
    text: string
  }

  export interface CommentObjRedux {
    postObjId: number;
    commentText: string
  }
*/