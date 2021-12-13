import { Injectable } from '@angular/core';
import { PostObj, PostType } from './all-posts/post-types';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private _posts: PostObj[] = [
    {
      id: 0,
      date: "2021-01-01T08:09",
      title: "post 1",
      text:"Text Post 1",
      isSelected: false,
      postType: PostType.economic,
    },
    {
      id: 1,
      date: "2021-01-01T10:16",
      title: "post 2",
      text:"Text Post 2",
      isSelected: false,
      postType: PostType.internet,
    },
    {
      id: 2,
      date: "2021-01-02T11:18",
      title: "post 3",
      text:"Text Post 3",
      isSelected: false,
      postType: PostType.politic,
    },
    {
      id: 3,
      date: "2021-01-03T14:16",
      title: "post 4",
      text:"Text post 4",
      isSelected: false,
      postType: PostType.tourism,
    },
    {
      id: 4,
      date: "2021-01-04T10:16",
      title: "post 5",
      text:"Text Post 5",
      isSelected: false,
      postType: PostType.internet,
    },
    {
      id: 5,
      date: "2021-01-06T16:16",
      title: "post 6",
      text:"Text Post 6",
      isSelected: false,
      postType: PostType.science,
    },
    {
      id: 6,
      date: "2021-01-07T17:16",
      title: "post 7",
      text:"Text Post 7",
      isSelected: false,
      postType: PostType.politic,
    },
  ]

  private postSubject!: BehaviorSubject<PostObj[]>;
  constructor(private httpClient: HttpClient) { }

  public getPosts():Observable<PostObj[]>{
    if (!this.postSubject) {
      this.postSubject = new BehaviorSubject<PostObj[]>([]);
    }

    this.httpClient.post<PostObj[]>("/Posts/GetPosts", null)
    .pipe(
      map(item => item.map(x => {
        return {
          id: x.id,
          date: x.date,
          title: x.title,
          text: x.text,
          postType: x.postType,
          isSelected: false
        };
      }))
    ).subscribe((value) => {
      this.postSubject?.next(value);
    });
    return this.postSubject?.asObservable();
  }

  public saveNewPost(post:PostObj):PostObj[] {
    const findPost = this._posts.find((e) => e.id == post.id);
    if (findPost) {
      findPost.date = post.date;
      findPost.title = post.title;
      findPost.text = post.text;
      findPost.isSelected = post.isSelected;
      findPost.postType = post.postType;
      this._posts = this._posts.map(e => {
        if (e.id == post.id) return {...e}
        else return e;
      });
    }
    else {
      let maxIndex = -1;
      this._posts.forEach((e) => {
        if (e.id > maxIndex) {
          maxIndex = e.id;
        }
      });
      maxIndex+=1;
      post.id = maxIndex;
      this._posts.push(post);
    }

    return this._posts;
  }

  public deleteSelectedPosts(): PostObj[] {
    let postsDeleted: PostObj[] = [];
    this._posts.forEach((e) => { 
      if (!e.isSelected) {
        postsDeleted.push(e);
      }
    });

    this._posts = postsDeleted;
    return this._posts;
  }

  public deletePost(post:PostObj): PostObj[] {
    const index = this._posts.findIndex((e) => e.id == post.id);
    if (index > -1) {
      this._posts.splice(index, 1);
    }

    return this._posts;
  }
}
