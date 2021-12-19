import { ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { NewsBlock, NewsType } from '../post-types';
import { NewsModalWindowComponent } from './news-modal-window/news-modal-window.component';

type MyNewsListType = Array<NewsBlock>;

@Component({
  selector: 'app-news-block',
  templateUrl: './news-block.component.html',
  styleUrls: ['./news-block.component.css']  
})
export class NewsBlockComponent {
  
  @ViewChild('newsModalWindowComponent') newsModalWindowComponent!: NewsModalWindowComponent;
  @ViewChild('contextMenuComponent') contextMenuComponent!: ContextMenuComponent;

  newsTypes: NewsType[] = [
    {id: 1, name: 'Политика'},
    {id: 2, name: 'Туризм'},
    {id: 3, name: 'Экономика'},
    {id: 4, name: 'Наука'},
    {id: 5, name: 'Интернет'}
  ];

  newsList: NewsBlock[] = [
    {id: 1, date: new Date("01.01.2021"), title: "НОВОСТЬ 1", text: "1", checked: false, newsType: {id: 2, name: 'Туризм'}},
    {id: 2, date: new Date("02.01.2021"), title: "новость 2", text: "2", checked: false, newsType: {id: 4, name: 'Наука'}},
    {id: 3, date: new Date("03.01.2021"), title: "Новость 3", text: "3", checked: false, newsType: {id: 5, name: 'Интернет'}}
  ];
  selectedTypeId: number = 0;

  selectedPost : NewsBlock = {id:0, date: new Date(),title:"",text:"",checked:false, newsType: {id: 0, name: ''}};
  showErrorText: boolean = false;
  hasSelectedItems: boolean = false;
  
  modalWindowDisplayed: boolean = true;

  mode: string = "Добавить новость";

  constructor(private cd: ChangeDetectorRef){

  }

  onAddItem() {
    this.selectedPost = {id:0, date: new Date(),title:"",text:"",checked:false, newsType: {id: 0, name: ''}};
    this.mode = "Добавить новость";
    this.newsModalWindowComponent.show();
  }

  onCancelEditing()
  {
    this.newsModalWindowComponent.hide();
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
    {
      this.selectedPost = {...editingItem};
      this.mode = "Изменить новость";
      this.newsModalWindowComponent.show();
    }
  }
  
  onSaveItem() {   
    this.showErrorText = false;
    if (this.selectedPost.newsType.id === 0) {
      this.showErrorText = true;
      return;
    }

    if (this.selectedPost.id != 0)
    {
       this.newsList = this.newsList.map(item => (item.id === this.selectedPost.id) ? this.selectedPost : item);
    }
    else 
    {      
      let newId = this.newsList.length === 0 ? 1 : Math.max(...this.newsList.map(item => item.id)) + 1;
      this.selectedPost.id = newId;
      this.newsList.push(this.selectedPost);
    }
    this.newsModalWindowComponent.hide();
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault(); 
    
    this.contextMenuComponent.show({top: event.clientY, left: event.clientX});
  }

  onCheckEverything() {
    this.newsList.forEach(x => x.checked = true);
    this.hasSelectedItems = true;
  }

  onDeleteChecked() {
    this.newsList = this.newsList.filter(x=>x.checked === false);
  }

  onSelectionChanged() {
    this.hasSelectedItems = this.newsList.some(x => x.checked === true);
  }

  onDateChange(value: Date) {
    this.selectedPost.date = value;
  }
  
  onTitleChange = (value: string) => {
    this.selectedPost.title = value;
  }
  
  onTextChange(value: string) {
    this.selectedPost.text = value;
  }

  onRadioChange(value: string) {
    let selectedType = this.newsTypes.find(x=>x.id === +value);
    if (selectedType)
      this.selectedPost.newsType = selectedType;
    else {
      this.selectedPost.newsType = {id: 0, name: ''};
    }
  }

}
