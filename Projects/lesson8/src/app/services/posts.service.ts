import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostObj } from '../models/post-types';

interface DataObj {
  id: number, 
  title: string,
  body: string
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postSubject?: BehaviorSubject<PostObj[]>;

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<PostObj[]> {
    /*if (!this.postSubject) {
      this.postSubject = new BehaviorSubject<PostObj[]>([]);*/

      return this.http.get<DataObj[]>('https://jsonplaceholder.typicode.com/posts').pipe(
        map(item => item.map(item1 => {return {id: item1.id, title: item1.title, text: item1.body, comments: []};}))
      )/*.subscribe((value) => {
        this.postSubject?.next(value);
      });
    }
    return this.postSubject.asObservable();*/
  }

  public addComment($event: string, id: number) {
    /*if (this.postSubject) {
      let posts: PostObj[] = this.postSubject?.value;
      posts.find(item => item.id === id)?.comments.push({commentText: $event});
      this.postSubject?.next(posts);
    }    */
  }

  /*public getPost(id: number): Observable<PostObj | undefined> {
    return this.getPosts().pipe(
      map(post => post.find(item => item.id === id))
    );
  }  */
}
