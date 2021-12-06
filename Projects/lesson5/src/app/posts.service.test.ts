import { Injectable, Self } from '@angular/core';
import { PostObj } from './all-posts/post-types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceTest {
  private posts: PostObj[] = [
    {
      id: 1,
      title: "Первая полоса!!!!!!!",
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

  public getPosts() {
    return this.posts;
  }

  constructor(private http: HttpClient) { }

  public addComment($event: string, id: number) {
    this.posts.find(item => item.id == id)?.comments.push({commentText: $event});
  }
}
