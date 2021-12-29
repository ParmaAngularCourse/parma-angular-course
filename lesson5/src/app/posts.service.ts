import { Injectable } from '@angular/core';
import { PostObj, PostType } from './all-posts/post-types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

type DataObj = {
    id: number,
    date:string,
    title:string,
    text: string,
    postType: PostType
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private api = "/Posts";

  private postSubject: BehaviorSubject<PostObj[]> = new BehaviorSubject<PostObj[]>([]);
  constructor(private httpClient: HttpClient) {
    this.loadPosts();
  }

  public getPostsOberverble():Observable<PostObj[]>{
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
    if (this.postSubject) {
      let posts = this.postSubject.getValue();
      let findIndex = posts.findIndex(e => e.id === post.id);
      if (findIndex > -1){
        this.updatePost(post, findIndex);
      }
      else {
        this.addPost(post);
      }
    }
  }

  addPost(post: PostObj) {
    let dataObjects = this.mapToDataObj([post]);
    this.httpClient.post(`${this.api}/AddPost`, dataObjects[0])
    .subscribe({
      next: (value) => {
        let posts = this.postSubject.getValue();
        post.id = value as number || -1;
        posts.push(post);
        this.postSubject.next(posts);
      },
      error: (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message),
      complete: () => { console.log("add post complite"); }
    });
  }

  updatePost(post: PostObj, findIndex: number) {
    let dataObjects = this.mapToDataObj([post]);
    let result: PostObj;
    this.httpClient.post(`${this.api}/UpdatePost`, dataObjects[0])
    .subscribe({
      next: (value) => {
        let posts = this.postSubject.getValue();
        posts[findIndex] = post;
        this.postSubject.next(posts); // Здесь можно отключить обновление всего списка
      },
      error: (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message),
      complete: () => { console.log("update post complite"); }
    });
  }

  public deleteSelectedPosts(posts: PostObj[]) {
      const ids = posts.filter(e => e.isSelected).map(e => e.id);
      this.httpClient.post(`${this.api}/DeletePosts`, ids).subscribe({
        next: (value) => {
          this.postSubject.next(posts.filter(e => !e.isSelected));
        },
        error: (error: HttpErrorResponse) => console.log(error.status + ' '+ error.message),
        complete: () => { console.log("delete selected posts complite"); }
    });
  }

  public deletePost(post:PostObj) {
      let posts = this.postSubject.getValue();
      this.httpClient.post(`${this.api}/DeletePosts`, [post.id]).subscribe({
        next: (value) => {
          this.postSubject.next(posts.filter(e => e.id !== post.id));
        },
        error: (error: HttpErrorResponse) => console.log(error.status + ' '+ error.message),
        complete: () => { console.log("delete single post complite"); }
    });
  }
}
