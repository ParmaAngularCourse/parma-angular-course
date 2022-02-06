import { PostType } from './post-types';

export interface searchModel {
  postType: PostType | null;
  title: string;
}
