import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {NewsTag} from "../news/news-types";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

  tagsList: NewsTag[] =[];
  private readonly _ngUnsubscribe$: Subject<number>;

  constructor(private _route: ActivatedRoute) {
    this._ngUnsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this._route.data
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(params => {
        this.tagsList = (params.TagsList as NewsTag[]);
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
