import { Component, Input, OnInit } from '@angular/core';

import {Card} from "./card";
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public card : Card ;

  constructor() { this.card = new Card }

  ngOnInit(): void {
  }
  onChange(): any {
    this.card.isSelected = !this.card.isSelected;
  }
}
