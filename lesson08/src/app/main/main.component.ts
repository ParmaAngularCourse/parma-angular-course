import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {NewsTag} from "../news/news-types";
import {Observable} from 'rxjs';
import {select, Store} from "@ngrx/store";
import * as fromStore from "../store";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  tagsList$!: Observable<NewsTag[]>;

  constructor(private _store: Store<fromStore.State>) {
  }

  ngOnInit(): void {
    this._store.dispatch(fromStore.loadTagsList());
    this.tagsList$ = this._store.pipe(select(fromStore.selectAllTags));
  }
}
