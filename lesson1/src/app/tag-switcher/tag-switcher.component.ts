import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NewsPostTag } from 'src/models/NewsPostTag';
import { GetStyleFromTag } from 'src/services/tagStyleService';
import { AllNewsComponent } from '../all-news/all-news.component';

@Component({
  selector: 'app-tag-switcher',
  templateUrl: './tag-switcher.component.html',
  styleUrls: ['./tag-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagSwitcherComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private newsComponent: AllNewsComponent,
    private router: Router
  ) {}

  newsTags = Object.values(NewsPostTag);
  ngOnInit(): void {}
  selectedTagKey: number = 0;
  onTagClick(i: number) {
    this.selectedTagKey = i;
    const params = i !== 0 ? { tag: this.newsTags[i] } : null;
    this.router.navigate([], { queryParams: params });
  }
}
