import {Component, Input, OnInit} from '@angular/core';
import {NewsItemModel} from "../news-types";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  isactive: boolean = false;
  activeClassName: string = "";

  @Input() newsItem!: NewsItemModel;
  constructor() {
  }

  ngOnInit(): void {
  }

  checkboxChange($event: Event){
    this.isactive = ($event.target as HTMLInputElement).checked;
    this.activeClassName = this.isactive ? 'active' : '';
  }
}
