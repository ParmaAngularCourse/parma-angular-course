import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
