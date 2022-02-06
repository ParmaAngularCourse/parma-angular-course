import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { StatusMsg } from 'src/model/StatusMsg';

@Component({
  selector: 'app-auto-hide-status-msg',
  templateUrl: './auto-hide-status-msg.component.html',
  styleUrls: ['./auto-hide-status-msg.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoHideStatusMsgComponent implements OnInit {
  private msgSubject:BehaviorSubject<StatusMsg>;
  private unsubscriptionSubj!:Subject<void>
  public statusMsg:StatusMsg;

  constructor(private cd:ChangeDetectorRef) { 
    this.statusMsg = new StatusMsg(true, '');
    this.msgSubject = new BehaviorSubject<StatusMsg>(this.statusMsg);
  }

  ngOnInit(): void {
    this.unsubscriptionSubj = new Subject();
    this.msgSubject
    .pipe(
      map(msg=>{
        this.statusMsg = msg;
        this.cd.markForCheck();
        return new StatusMsg(true, '')    
      }),
      delay(3000),
      takeUntil(this.unsubscriptionSubj)
    )
    .subscribe(msg=> {
      this.statusMsg = msg;
      this.cd.markForCheck();
    });
  }

  ShowStatusMessage(message:StatusMsg):Observable<StatusMsg>{
    this.msgSubject.next(message);
    return this.msgSubject.pipe(delay(2000));
  }
  
  ngOnDestroy(){
    this.unsubscriptionSubj.next();
    this.unsubscriptionSubj.complete();
  }
}
