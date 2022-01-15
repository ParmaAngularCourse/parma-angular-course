import { KeyValue } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { NewsPostTag } from 'src/models/NewsPostTag';

@Component({
  selector: 'app-news-radio-control',
  templateUrl: './news-radio-control.component.html',
  styleUrls: ['./news-radio-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsRadioControlComponent implements OnInit {
  @Input() newsTags!: Array<NewsPostTag>;
  @Input() selectedTag: NewsPostTag | undefined;

  constructor() {}

  ngOnInit(): void {}

  onRadioChange = (index: number) => {
    this.selectedTag = this.newsTags[index];
  };
}
