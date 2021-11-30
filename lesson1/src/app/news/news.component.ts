import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

type newsType = {
  id: number,
  dt: string,
  name: string,
  checked: boolean
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public newsItems: newsType[] = [
    {id: 1, dt: "20.11.2021 10:20", name: "«Газпром» может прекратить поставки газа в Молдавию за долги", checked: false},
    {id: 2, dt: "21.11.2021 11:10", name: "Роскомнадзор потребовал от 13 компаний открыть представительства в России", checked: false},
    {id: 3, dt: "22.11.2021 14:30", name: "Исследования детской вакцины от COVID-19 начнутся после одобрения препарата для подростков", checked: false},
    {id: 4, dt: "22.11.2021 18:20", name: "В Югре ввели режим самоизоляции для непривитых жителей четырех муниципалитетов", checked: false}
  ]
  constructor() { }

  ngOnInit(): void {
  }

  selectNews(id: number)
  {
    this.newsItems[id-1].checked = !this.newsItems[id-1].checked;
  }
}

