export type PostObj = {
    id: number;
    title: string,
    text: string,
    comments: CommentObj[]
  }

  export type CommentObj = {
    commentText: string
  }
