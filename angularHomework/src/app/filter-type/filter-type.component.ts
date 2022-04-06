import { Component, OnInit } from '@angular/core';
import { NewsType, NewsTypeObjectEnum } from '../model/news-type';

@Component({
  selector: 'app-filter-type',
  templateUrl: './filter-type.component.html',
  styleUrls: ['./filter-type.component.css']
})
export class FilterTypeComponent implements OnInit {

  public newsTypes: NewsType[] = Object.values(NewsTypeObjectEnum);
  
  constructor() { }

  ngOnInit(): void {
  }
}
