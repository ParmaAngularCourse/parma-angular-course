import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NewsItem } from '../news-types';


@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})



export class PopupDialogComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {  }

  isVisible: boolean = false;

  @Input()NewsElement!: NewsItem ;

  @Output() closeEditDialog = new EventEmitter();
			  
  onClickCloseButton(){
    this.closeEditDialog.emit();
  }

  show(){
    this.isVisible = true;
  }
  
  close(){
    this.isVisible = false;    
  }
}
