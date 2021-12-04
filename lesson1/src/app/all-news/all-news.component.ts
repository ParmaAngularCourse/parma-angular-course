import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EditFormComponent } from './edit-form/edit-form.component';
import { News } from './news';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  public isFormVisible: boolean = false;

  public items: News[] = [{
    id: 1,
    header: "Заголовок 1",
    dateTime: "15.11.2021",
    isChecked: false
  },
  {
    id: 2,
    header: "Заголовок 2",
    dateTime: "17.11.2021",
    isChecked: false
  },
  {
    id: 3,
    header: "Заголовок 3",
    dateTime: "22.11.2021",
    isChecked: false
  }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteNews($event: News) {
    this.items = this.items.filter(x => x != $event)
  }

  isEdit: boolean = false;
  itemToEdit !: News;
  onEditNews($event: News) {
    this.isEdit = true;
    this.isFormVisible = true;
    this.itemToEdit = $event;
  }

  addClick() {
    this.isFormVisible = true;
  }

  closeForm() {
    this.itemToEdit = new News(0, "", "", false);
    this.isEdit =false;
    this.isFormVisible = false;
  }

  createNews(news: News) {
    news.id = this.items[this.items.length - 1].id + 1;
    this.items.push(news);
    this.isFormVisible = false;
  }

  updateNews(news: News) {
    let item = this.items.find(x=>x.id == news.id);
    item!.header= news.header;
    item!.dateTime= news.dateTime;
    this.isFormVisible = false;
    this.isEdit = false;
  }

}
