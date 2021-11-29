import { Component, OnInit } from '@angular/core';

let counter = 0;
@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {

  count: number;
  constructor() { 
    this.count = counter++;
  }

  ngOnInit(): void {
  }

}
