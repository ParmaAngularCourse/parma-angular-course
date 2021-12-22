import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {takeUntil} from "rxjs/operators";

export type PersonInfo = {
  name: string,
  family: string,
  email: string
};

@Injectable({
  providedIn: 'root'
})
export class PersonInfoService implements OnDestroy {

  private _url: string = "http://localhost:3000/api/";
  private _infoSubject?: BehaviorSubject<PersonInfo>;
  private _ngUnsubscribe$: Subject<number>;

  constructor(private _http: HttpClient) {
    this._ngUnsubscribe$ = new Subject<number>();
  }

  public getPersonInfo() : Observable<PersonInfo> {
    this._infoSubject = new BehaviorSubject<PersonInfo>({} as PersonInfo);
    this._http.get<PersonInfo>(this._url + "personinfo")
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next: value => this._infoSubject?.next(value)
      });
    return  this._infoSubject.asObservable();
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
