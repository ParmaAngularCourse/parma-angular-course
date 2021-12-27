import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {

  isVisible: boolean = false;
  text: string = "";
  private ngUnsubscribe$ = new Subject();

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() : void {
    this.store.pipe(
      select(fromStore.selectSnackBarMessage),
      filter(message => message !== ""),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(message => {
      this.show(message);
    })
  }

  show(_text: string) {
    this.text = _text;
    this.isVisible = true;
    setTimeout(() => { this.isVisible = false; this.store.dispatch(fromStore.addSnackBarMessage({ message: "" })) }, 3000);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
