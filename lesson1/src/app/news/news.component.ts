import { Component, OnInit } from '@angular/core';


type Information =
{
    date: string,
    title: string,
    isCheck?: boolean,
}


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public informationList: Information[] = [
    {
      date: "1.1.1900", 
      title: "Новость 1", 
    },

    {
      date: "1.12.1900", 
      title: "Новость 2", 
    },
    {
      date: "1.1.2000", 
      title: "Новость 3", 
    },
    {
      date: "1.12.2000", 
      title: "Новость 4", 
    }    
  ];



  constructor() { }

  ngOnInit(): void 
  {
  }


  onCheckboxChange($event: Event, item: Information)
  {    
    let checkboxItem = ($event.target as HTMLInputElement);
    item.isCheck =  checkboxItem.checked;
  }

}
