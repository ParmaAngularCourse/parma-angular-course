import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { NewsBlock } from 'src/app/post-types';

@Component({
  selector: 'app-news-modal-window',
  templateUrl: './news-modal-window.component.html',
  styleUrls: ['./news-modal-window.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsModalWindowComponent {


  public windowShown: boolean = false;

  constructor(private cd: ChangeDetectorRef)
  {

  }

  ngDoCheck(){
    //console.log("new-modal");
  }

  ngAfterViewInit(): void {

  }

  show() {
    this.windowShown = true;
    this.cd.markForCheck();
  }

  hide() {
    this.windowShown = false;
    this.cd.markForCheck();
  }
}

