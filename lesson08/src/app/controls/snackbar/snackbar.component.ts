import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subject} from "rxjs";
import {select, Store} from "@ngrx/store";
import * as fromStore from '../../store'
import {filter, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarComponent implements OnInit, OnDestroy {

  isVisible: boolean = false;
  text: string = "";
  private ngUnsubscribe$ = new Subject();

  constructor(private _store: Store<fromStore.State>,
              private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._store
      .pipe(
        select(fromStore.selectSnackBarMessage),
        filter(message => message !== ""),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(message => {
        this.show(message);
      });
  }

  show(text: string) {
    this.text = text;
    this.isVisible = true;
    this._cd.detectChanges();

    setTimeout(() => {
      this.isVisible = false;
      this._cd.detectChanges();
      this._store.dispatch(fromStore.addSnackBarMessage({ message: "" }))
    }, 3000);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
