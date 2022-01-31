import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {TagsListService} from "../services/tags-list.service";
import {Observable, Subject} from "rxjs";
import {NewsTag} from "../news-types";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import * as fromStore from "../../store";

@Component({
  selector: 'app-tags-selector',
  templateUrl: './tags-selector.component.html',
  styleUrls: ['./tags-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: TagsSelectorComponent
  }]
})
export class TagsSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {

  controlValue: string | null = "";
  tagsList$!: Observable<NewsTag[]>;

  onChange!: (_: string) => {};
  onTouched!: () => {};

  private _ngUnsubscribe$: Subject<number>;

  constructor(private _tagsListService: TagsListService,
              private _store: Store<fromStore.State>,
              private _cd: ChangeDetectorRef) {
    this._ngUnsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.tagsList$ = this._store.pipe(select(fromStore.selectAllTags));
  }

  onTagsChange(value: string) {
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(_onChange: any): void {
    this.resetValue();
    this.onChange = _onChange;
  }

  registerOnTouched(_onTouched: any): void {
    this.resetValue()
    this.onTouched = _onTouched;
  }

  writeValue(_val: string): void {
    this.controlValue = _val;
    this._cd.detectChanges();
  }

  resetValue() {
    if(this.controlValue == "") {
      this.controlValue = null;
    }
  }

ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
