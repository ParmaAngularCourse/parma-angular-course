import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter, takeUntil, Subject } from 'rxjs';
import * as fromStore from '../../../store'

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  isVisible: boolean = false;
  text: string = "";

  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<fromStore.State>) {

  }


  ngOnInit(): void {
    this.store.pipe(
      select(fromStore.selectSnckBarMessage),
      filter(message => message !== ""),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(message => this.show(message));
  }



  show(_text: string) {
    this.text = _text;
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
      this.store.dispatch(fromStore.actionSnackBar({message: ""}));
    }, 5000);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

}
