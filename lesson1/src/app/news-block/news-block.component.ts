import { ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import * as moment from 'moment';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { NewsBlock, NewsType } from '../post-types';
import { NewsModalWindowComponent } from './news-modal-window/news-modal-window.component';
import { SinglePostComponent } from './single-post/single-post.component';

type MyNewsListType = Array<NewsBlock>;

@Component({
  selector: 'app-news-block',
  templateUrl: './news-block.component.html',
  styleUrls: ['./news-block.component.css']  
})
export class NewsBlockComponent {
  
  @ViewChild('newsModalWindowComponent') newsModalWindowComponent!: NewsModalWindowComponent;
  @ViewChild('contextMenuComponent') contextMenuComponent!: ContextMenuComponent;
  @ViewChildren(SinglePostComponent) postsList! : QueryList<SinglePostComponent>;

  public newsTypes: NewsType[] = [
    {id: 1, name: 'Политика'},
    {id: 2, name: 'Туризм'},
    {id: 3, name: 'Экономика'},
    {id: 4, name: 'Наука'},
    {id: 5, name: 'Интернет'}
  ];

  public newsList: NewsBlock[] = [
    {id: 1, date: new Date("01.01.2021"), title: "Новость 1", text: "1", checked: false, newsType: {id: 2, name: 'Туризм'}},
    {id: 2, date: new Date("02.01.2021"), title: "Новость 2", text: "2", checked: false, newsType: {id: 4, name: 'Наука'}},
    {id: 3, date: new Date("03.01.2021"), title: "Новость 3", text: "3", checked: false, newsType: {id: 5, name: 'Интернет'}}
  ];
  public selectedTypeId: number = 0;

  public selectedPost : NewsBlock = {id:0, date: new Date(),title:"",text:"",checked:false, newsType: {id: 0, name: ''}};
  public dateMask: string = "00.00.0000";
  public dateStr: string = "";
  public showErrorText: boolean = false;
  public hasSelectedItems: boolean = false;
  
  public modalWindowDisplayed: boolean = true;

  public mode: string = "Добавить новость";

  constructor(private cd: ChangeDetectorRef){

  }

  onAddItem() {
    this.selectedTypeId = 0;
    this.selectedPost = {id:0, date: new Date(),title:"",text:"",checked:false, newsType: {id: 0, name: ''}};
    this.dateStr = moment(this.selectedPost.date).format("DD.MM.YYYY");
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
      this.selectedPost = editingItem;
      this.dateStr = moment(this.selectedPost.date).format("DD.MM.YYYY");
      this.selectedTypeId = editingItem.newsType.id;
      this.mode = "Изменить новость";
      this.newsModalWindowComponent.show();
    }
  }
  
  onSaveItem(date: string, title: string, text: string) {   
    this.showErrorText = false;

    let momentDate = moment(date, 'DD.MM.YYYY', true);
    if (!momentDate.isValid()) {
      this.showErrorText = true; 
      return;
    }

    this.selectedPost.date = momentDate.toDate();
    this.selectedPost.title = title;
    this.selectedPost.text = text;
    if (this.selectedTypeId === 0) {
      this.showErrorText = true; 
      return;
    }

    let selectedType = this.newsTypes.find(x=>x.id === this.selectedTypeId);
    if (selectedType)
      this.selectedPost.newsType = selectedType;

    if (this.selectedPost.id != 0)
    {
       this.newsList = this.newsList.map(item => 
         { 
           return (item.id === this.selectedPost.id) ? {...this.selectedPost} : item;
         });
    }
    else 
    {
      let newId = Math.max(...this.newsList.map(item => item.id)) + 1;
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
    this.postsList.forEach(x => x.single_post.checked = true);
    this.hasSelectedItems = true;
  }

  onDeleteChecked() {
    this.newsList = this.newsList.filter(x=>x.checked === false);
  }

  onSelectionChanged() {
    this.hasSelectedItems = this.postsList.some(x => x.single_post.checked === true);
  }

}
