import { Component, OnInit } from '@angular/core';
type NewsItem =  {
  caption: string,
  date: Date,
  checked: boolean
}

type NewsElements = Array<NewsItem>;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public ourNews: NewsElements =[
    { caption:'Samsung полностью прекращает выпуск смартфонов серии Galaxy Note'
      , date: new Date(2021, 1, 1), checked: false },
    { caption:'Представлен компактный ПК-корпус с вертикальным и горизонтальным размещением'
      , date: new Date(2021, 2, 2), checked: true },
    { caption:'SpaceX начала переносить сроки подключения абонентов к Starlink на следующий год', date: new Date(2021, 3, 3)
      , checked: true },
    { caption:'Онлайн-кинотеатр Megogo задействует нейросеть для поиска запрещённого контента', date: new Date(2021, 4, 4)
      , checked: false },
];

//isDefaultStyle: boolean = true;

setCheckedNews($event: Event , newsItem: NewsItem){
  newsItem.checked = ($event.target as HTMLInputElement).checked;
}

  constructor() { }

  ngOnInit(): void {
  }

}
