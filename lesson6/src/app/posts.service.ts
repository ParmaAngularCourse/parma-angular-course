import { Injectable } from '@angular/core';
import { PostObj, PostType } from './all-posts/post-types';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

type DataObj = {
    id: number,
    date:string,
    title:string,
    text: string,
    postType: PostType | null
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private api = "/Posts";

  private postSubject: BehaviorSubject<PostObj[] | null | undefined> = new BehaviorSubject<PostObj[] | null| undefined>([]);
  private postSearchSubject: BehaviorSubject<PostObj[] | null | undefined> = new BehaviorSubject<PostObj[] | null| undefined>([]);
  private _bufferPosts: Map<string, PostObj[] | null | undefined> = new Map<string, PostObj[] | null | undefined>();

  constructor(private httpClient: HttpClient) {
    this.loadPosts();
  }

  public getPostsOberverble():Observable<PostObj[] | null | undefined>{
    return this.postSubject.asObservable();
  }

  public loadPosts() {
    this.httpClient.post<DataObj[]>(`${this.api}/GetPosts`, null)
      .pipe(
        map(item => this.mapToPostObj(item))
      ).subscribe((value) => {
        this.postSubject.next(value);
      });
  }

  private mapToPostObj(items: DataObj[]): PostObj[] {
    return items.map(x => {
      return {
        id: x.id,
        date: x.date,
        title: x.title,
        text: x.text,
        postType: x.postType,
        isSelected: false
      };
    });
  }

  private mapToDataObj(items: PostObj[]): DataObj[] {
    return items.map(x => {
      return {
        id: x.id,
        date: x.date,
        title: x.title,
        text: x.text,
        postType: x.postType,
      };
    });
  }

  public saveNewPost(post:PostObj) {
    if (post.id === -1){
      this.addPost(post);
    }
    else {
      this.updatePost(post);
    }
  }

  addPost(post: PostObj) {
    let dataObjects = this.mapToDataObj([post]);
    this.httpClient.post(`${this.api}/AddPost`, dataObjects[0])
    .subscribe({
      next: (value) => {
        let posts = this.postSubject.getValue();
        post.id = value as number || -1;
        posts?.push(post);
        this.postSubject.next(posts);
      },
      error: (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message),
      complete: () => { console.log("add post complite"); }
    });
  }

  updatePost(post: PostObj) {
    let dataObjects = this.mapToDataObj([post]);
    this.httpClient.post(`${this.api}/UpdatePost`, dataObjects[0])
    .subscribe({
      next: (value) => {
        let posts = this.postSubject.getValue();
        if (posts) {
          let findIndex = posts.findIndex(e => e.id === post.id);
          posts[findIndex] = post;
        }
        this.postSubject.next(posts); // Здесь можно отключить обновление всего списка
      },
      error: (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message),
      complete: () => { console.log("update post complite"); }
    });
  }

  public deleteSelectedPosts(posts: PostObj[] | null | undefined) {
    if (posts) {
        const ids = posts.filter(e => e.isSelected).map(e => e.id);
        this.httpClient.post(`${this.api}/DeletePosts`, ids).subscribe({
          next: (value) => {
            this.postSubject.next(posts.filter(e => !e.isSelected));
          },
          error: (error: HttpErrorResponse) => console.log(error.status + ' '+ error.message),
          complete: () => { console.log("delete selected posts complite"); }
      });
    }
  }

  public deletePost(post:PostObj) {
      let posts = this.postSubject.getValue();
      this.httpClient.post(`${this.api}/DeletePosts`, [post.id]).subscribe({
        next: (value) => {
          if (posts) {
            this.postSubject.next(posts.filter(e => e.id !== post.id));
          }
        },
        error: (error: HttpErrorResponse) => console.log(error.status + ' '+ error.message),
        complete: () => { console.log("delete single post complite"); }
    });
  }

  public searchPosts(value: string) {
    let searchObs = this.httpClient.post<DataObj[]>(`${this.api}/SearchPost`, {value}).pipe(
        map(item => this.mapToPostObj(item))
    ).subscribe((valuePost) => {
      this._bufferPosts.set(value, valuePost);
      this.postSearchSubject.next(valuePost);
    });
  }

  public searchPostsWithBuffer(value: string) {

    if (this._bufferPosts.has(value)) {
      let bufferValue = this._bufferPosts.get(value);
      this.postSearchSubject.next(bufferValue);
    }
    else {
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.set("Content-Type", "application/json");
      let searchObs = this.httpClient.post<DataObj[]>(`${this.api}/SearchPost`, {value}, {
        headers: httpHeaders
      }).pipe(
          map(item => this.mapToPostObj(item))
      );
      searchObs.subscribe((valuePost) => {
        this._bufferPosts.set(value, valuePost);
        this.postSearchSubject.next(valuePost);
      });
    }
  }

  public searchPostsObserverble(): Observable<PostObj[]| null | undefined> {
    return this.postSearchSubject.asObservable();
  }
}
