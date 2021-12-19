import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-news-modal-window',
  templateUrl: './news-modal-window.component.html',
  styleUrls: ['./news-modal-window.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsModalWindowComponent {

  @Input() windowTitle: string = "";

  windowShown: boolean = false;

  constructor(private cd: ChangeDetectorRef)
  {

  }

  ngDoCheck() {
    //console.log("new-modal");
  }

  show() {
    this.windowShown = true;
    //this.cd.markForCheck();
  }

  hide() {
    this.windowShown = false;
    //this.cd.markForCheck();
  }
}

