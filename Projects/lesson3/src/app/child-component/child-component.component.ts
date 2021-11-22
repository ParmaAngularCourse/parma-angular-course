import { Component, OnInit } from '@angular/core';

let counter = 0;
@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {

  count: number;
  isVisible: boolean = false;
  position: {top: number, left: number} = {top: 0, left: 0};
  constructor() { 
    this.count = counter++;
  }

  ngOnInit(): void {
  }

  show(param: {top: number, left: number}) {
    this.isVisible = true;
    this.position = param;
  }
}
