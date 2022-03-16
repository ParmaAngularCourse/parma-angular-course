import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  Input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of } from 'rxjs';
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  newsTags = Object.values(NewsPostTag);
  private newsTagsKeys = Object.keys(NewsPostTag);

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(filter((x) => x.has('tag')))
      .subscribe((x) => {
        const tagUrlVal: string = x.get('tag')!;

        this.selectedTagKey = this.newsTags.findIndex((x) => x == tagUrlVal);
      });
  }
  selectedTagKey: number = 0;

  onTagClick(i: number) {
    this.selectedTagKey = i;
    const params = i !== 0 ? { tag: this.newsTags[i] } : null;
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
