import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding, Input } from '@angular/core';
import { NewsPostTag } from 'src/models/NewsPostTag';
import { GetStyleFromTag } from 'src/services/tagStyleService';

@Component({
  selector: 'app-tag-switcher',
  templateUrl: './tag-switcher.component.html',
  styleUrls: ['./tag-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagSwitcherComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  selectedTagKey!: number;

  newsTags = Object.values(NewsPostTag);
  ngOnInit(): void {}

  onTagClick(i: number) {
    this.selectedTagKey = i;
    console.log(i)
    this.cdr.markForCheck();
  }
}
