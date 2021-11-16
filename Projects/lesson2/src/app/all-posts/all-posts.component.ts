import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostObj } from './post-types';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPostsComponent implements OnInit {

  public posts: PostObj[] = [
    {
      id: 1,
      title: "Первая полоса",
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


  constructor() { }

  ngOnInit(): void {
  }

  onAddComment($event: string, id: number) {
    this.posts.find(item => item.id == id)?.comments.push({commentText: $event});

    let item = this.posts.find(item => item.id ==3);
    if (item) item.title = '!!!!!!!!!';

    this.posts = [...this.posts].map(item => {if (item.id == 3) return {...item}; else return item;});
  }

  ngDoCheck() {
    console.log('all-posts');
  }
}


/*
const oldSetTimeout = setTimeout;

setTimeout = (callback, time) => {
  oldSetTimeout(() => {
    console.log('START');
    callback();
    console.log('END');
  }, time )
}
*/