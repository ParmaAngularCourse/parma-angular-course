import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {NewsTag} from "../news/news-types";
// import {TagsListService} from "../news/services/tags-list.service";
// import {takeUntil} from "rxjs/operators";
// import {Subject} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

  tagsList: NewsTag[] =[
    {tag: "politic", text: "Политика", color: "#58B957"},
    {tag: "tourism", text: "Туризм", color: "#55BFE0"},
    {tag: "economy", text: "Экономика", color: "#EFAC43"},
    {tag: "science", text: "Наука", color: "#3D8BCD"},
    {tag: "internet", text: "Интернет", color: "#999999"}
  ];
  //private readonly _ngUnsubscribe$: Subject<number>;

  constructor(/*private _tagsListService: TagsListService*/) {
    //this._ngUnsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    /*this._tagsListService.getTagsList()
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next : (data) => this.tagsList = data
      });*/
  }

  ngOnDestroy() {
    /*this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();*/
  }

}
