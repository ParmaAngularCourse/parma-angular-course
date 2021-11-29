import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.css']
})
export class ParentComponentComponent implements OnInit {

  public childComponentTemplate!: TemplateRef<any>;
  constructor() { }

  isFlag: number = 1;
  ngOnInit(): void {
  }

  checkButton() {
    this.isFlag++;
    if (this.isFlag>3) {
      this.isFlag=1;
    }
  }
}
