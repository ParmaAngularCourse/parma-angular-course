import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, delay, filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { StatusMsg } from 'src/model/StatusMsg';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarComponent implements OnInit {
  private unsubscriptionSubj!:Subject<void>
  public isVisible:boolean = false;
  public statusMsg:StatusMsg;

  constructor(
    private cd:ChangeDetectorRef,
    private store: Store<fromStore.State>) { 
    this.statusMsg = new StatusMsg(true, '');
  }

  ngOnInit(): void {
    this.unsubscriptionSubj = new Subject();
    this.store.pipe(
      select(fromStore.selectSnackBarMessage),
      filter(msg=> msg.message !== ''),
      takeUntil(this.unsubscriptionSubj)
    ).subscribe(msg => {
      this.show(msg)
    })
  }

  show(msg:StatusMsg){
    this.statusMsg = msg;
    this.isVisible = true;
    this.cd.markForCheck();
    setTimeout(()=> {
      this.store.dispatch(fromStore.addSnackBarMessage({statusMessage: new StatusMsg(true, '')}))
      this.isVisible = false;
      this.cd.markForCheck();
    }, 3000)
  }

  ngOnDestroy(){
    this.unsubscriptionSubj.next();
    this.unsubscriptionSubj.complete();
  }
}
