import { Component, OnInit } from '@angular/core';


type information ={
    date: string,
    title: string,
    style_color: string
}



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public informationList: Array<information> = [
    {
      date: "1.1.1900", 
      title: "Новость 1", 
      style_color: "white"
    },

    {
      date: "1.12.1900", 
      title: "Новость 2", 
      style_color: "white"
    },
    {
      date: "1.1.2000", 
      title: "Новость 3", 
      style_color: "white"
    },
    {
      date: "1.12.2000", 
      title: "Новость 4", 
      style_color: "white"
    }    
  ];



  constructor() { }

  ngOnInit(): void {
  }


  onCheckboxChange($event: Event, item: information){    
    var checkboxItem = ($event.target as HTMLInputElement);
    var isSelected =  checkboxItem.checked;
    
    if(isSelected)
    {
      item.style_color = "gray";
    }
    else
    {
      item.style_color  = "white";
    }
}

}
