import { Injectable } from '@angular/core';
import { PostObj, PostType } from '../all-posts/post-types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { searchModel } from '../all-posts/searchModel';

type DataObj = {
  id: number;
  date: string;
  title: string;
  text: string;
  postType: PostType | null;
};

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private api = '/Posts';

  private postSubject: BehaviorSubject<PostObj[]> = new BehaviorSubject<
    PostObj[]
  >([]);

  constructor(private httpClient: HttpClient) {
    this.loadPosts();
  }

  public getPostsOberverble(): Observable<PostObj[]> {
    return this.postSubject.asObservable();
  }

  public loadPosts() {
    this.httpClient
      .post<DataObj[]>(`${this.api}/GetPosts`, null)
      .pipe(map((item) => this.mapToPostObj(item)))
      .subscribe({
        next: (value) => {
          this.postSubject.next(value);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Complite GetPosts');
        },
      });
  }

  private mapToPostObj(items: DataObj[]): PostObj[] {
    return items.map((x) => {
      return {
        id: x.id,
        date: x.date,
        title: x.title,
        text: x.text,
        postType: x.postType,
        isSelected: false,
      };
    });
  }

  private mapToDataObj(items: PostObj[]): DataObj[] {
    return items.map((x) => {
      return {
        id: x.id,
        date: x.date,
        title: x.title,
        text: x.text,
        postType: x.postType,
      };
    });
  }

  public saveNewPost(post: PostObj) {
    if (post.id === -1) {
      this.addPost(post);
    } else {
      this.updatePost(post);
    }
  }

  addPost(post: PostObj) {
    let dataObjects = this.mapToDataObj([post]);
    this.httpClient.post(`${this.api}/AddPost`, dataObjects[0]).subscribe({
      next: (value) => {
        // let posts = this.postSubject.getValue();
        // post.id = value as number || -1;
        // posts?.push(post);
        // this.postSubject.next(posts);
      },
      error: (error: HttpErrorResponse) =>
        console.log(error.status + ' ' + error.message),
      complete: () => {
        this.loadPosts();
        console.log('add post complite');
      },
    });
  }

  updatePost(post: PostObj) {
    let dataObjects = this.mapToDataObj([post]);
    this.httpClient.post(`${this.api}/UpdatePost`, dataObjects[0]).subscribe({
      next: (value) => {
        // let posts = this.postSubject.getValue();
        // if (posts) {
        //   let findIndex = posts.findIndex(e => e.id === post.id);
        //   posts[findIndex] = post;
        // }
        // this.postSubject.next(posts); // Здесь можно отключить обновление всего списка
      },
      error: (error: HttpErrorResponse) =>
        console.log(error.status + ' ' + error.message),
      complete: () => {
        this.loadPosts();
        console.log('update post complite');
      },
    });
  }

  public deleteSelectedPosts(posts: PostObj[]) {
    if (posts) {
      const ids = posts.filter((e) => e.isSelected).map((e) => e.id);
      this.httpClient.post(`${this.api}/DeletePosts`, ids).subscribe({
        next: (value) => {
          //this.postSubject.next(posts.filter(e => !e.isSelected));
        },
        error: (error: HttpErrorResponse) =>
          console.log(error.status + ' ' + error.message),
        complete: () => {
          this.loadPosts();
          console.log('delete selected posts complite');
        },
      });
    }
  }

  public deletePost(post: PostObj) {
    //let posts = this.postSubject.getValue();
    this.httpClient.post(`${this.api}/DeletePosts`, [post.id]).subscribe({
      next: (value) => {
        // if (posts) {
        //   this.postSubject.next(posts.filter(e => e.id !== post.id));
        // }
      },
      error: (error: HttpErrorResponse) =>
        console.log(error.status + ' ' + error.message),
      complete: () => {
        this.loadPosts();
        console.log('delete single post complite');
      },
    });
  }

  public searchPosts(value: searchModel) {
    this.httpClient
      .post<DataObj[]>(`${this.api}/SearchPost`, value)
      .pipe(map((item) => this.mapToPostObj(item)))
      .subscribe((valuePost) => {
        this.postSubject.next(valuePost);
      });
  }

  public searchPosts2(value: searchModel): Observable<PostObj[]> {
    return this.httpClient
      .post<DataObj[]>(`${this.api}/SearchPost`, value)
      .pipe(map((item) => this.mapToPostObj(item)));
  }

  public setResultSearch(posts: PostObj[]) {
    this.postSubject.next(posts);
  }
}
