import { Injectable, Self } from '@angular/core';
import { PostObj } from './all-posts/post-types';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


type DataObj = {
  id: number, 
  title: string,
  body: string
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: PostObj[] = [
    {
      id: 1,
      title: "Первая полоса" + Math.random(),
      text: "Наши новости на первой полосе",
      comments: [{commentText: "какая-то ерунда"}, {commentText: "соверешенно не интересно"}, {commentText: "ничего не понятно"}]
    }, 
    {
      id: 2,
      title: "Горячие новости",
      text: "Наши новости самые гоорячие",
      comments: [{commentText: "супер новость!"}, {commentText: "что за чушь"}]
    },
    {
      id: 3,
      title: "О том, о сём",
      text: "Давайте поговорим",
      comments: [{commentText: "ну вот опять"}]
    }
  ];

  private postSubject?: BehaviorSubject<PostObj[]>;
  public getPosts(): Observable<PostObj[]> {
    if (!this.postSubject) {
      this.postSubject = new BehaviorSubject<PostObj[]>([]);

      this.http.get<DataObj[]>('https://jsonplaceh5656older.typicode.com/posts').pipe(
        map(item => item.map(item1 => {return {id: item1.id, title: item1.title, text: item1.body, comments: []};}))
      ).subscribe((value) => {
        this.postSubject?.next(value);
      });
    }
    return this.postSubject.asObservable();
  }

  constructor(private http: HttpClient) { }

  public addComment($event: string, id: number) {
    if (this.postSubject) {
      let posts: PostObj[] = this.postSubject?.value;
      posts.find(item => item.id == id)?.comments.push({commentText: $event});
      this.postSubject?.next(posts);
    }    
  }
}
