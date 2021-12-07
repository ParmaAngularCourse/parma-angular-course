import { Component } from '@angular/core';
import { NewsBlock } from '../post-types';

type MyNewsListType = Array<NewsBlock>;

@Component({
  selector: 'app-news-block',
  templateUrl: './news-block.component.html',
  styleUrls: ['./news-block.component.css']  
})
export class NewsBlockComponent {
  
  public newsList: NewsBlock[] = [
    {id: 1, date: "01.01.2021 10:00", title: "Новость 1", text: "1", checked: false},
    {id: 2, date: "02.01.2021 10:00", title: "Новость 2", text: "2", checked: false},
    {id: 3, date: "03.01.2021 10:00", title: "Новость 3", text: "3", checked: false}
  ];

  public newPost : NewsBlock = {id:0, date:"",title:"",text:"",checked:false};
  
  public modalWindowDisplayed: boolean = false;

  showModalWindow() {
    this.modalWindowDisplayed = true;
  }

  hideModalWindow() {
    this.modalWindowDisplayed = false;
  }

  clickAddButton() {
    this.newPost = {id:0, date:"",title:"",text:"",checked:false};
    this.showModalWindow();
  }

  onSaveItem(savedItem: NewsBlock)
  {    
    //var changedItem = this.newsList.find(item => item.id == savedItem.id);
    if (savedItem.id != 0)
    {
      this.newsList = this.newsList.map(item => 
        { 
          return (item.id === savedItem.id) ? {...savedItem} : item;
        });
    }
    else 
    {
      let newId = Math.max(...this.newsList.map(item => item.id)) + 1;
      savedItem.id = newId;
      this.newsList.push(savedItem);
    }
    this.hideModalWindow();
  }

  onCancelEditing()
  {
    this.hideModalWindow();
  }

  onDeleteItem(id:number)
  {
    let deletingItem = this.newsList.find(item => item.id === id);
    if (deletingItem) {
      let index = this.newsList.indexOf(deletingItem);
      this.newsList.splice(index, 1);
    }
  }

  onEditItem(id:number)
  {
    let editingItem = this.newsList.find(item => item.id === id);
    if (editingItem)
      this.newPost = editingItem;
    this.showModalWindow();
  }

  ngDoCheck(){
    console.log("news-block");
  }
}
