import { Component, OnInit } from '@angular/core';
import { EMPTY, from, Observable, of } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { throwError } from 'rxjs/internal/observable/throwError';
import { zip } from 'rxjs/internal/observable/zip';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators/map';
import { mergeAll } from 'rxjs/internal/operators/mergeAll';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { bufferCount, catchError, concatAll, exhaustMap, finalize, retry, retryWhen, switchMap, tap, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    zip(
      interval(500),
      of('1', '2', '3', 4, '5', '6', '7')
    ).pipe(
      switchMap(([, y]) => { return of(y).pipe(
        map((value) => { 
          return (value as any).toUpperCase(); 
        }),
        tap(() => { console.log('до отлова') }),
        catchError((err) => {
          return EMPTY
        }),
        tap(() => { console.log('после отлова') })
      )})      
    ).subscribe({
      next: (value: any) => console.log('Next: ', value),
      complete: () => console.log('Complete!'),
      error: (error) => console.log('Error: ', error)
    });


    /*from([1, 2, 3, 4]).pipe(
      map(param => /*this.getData(param) [1, 2, 3]),
      concatAll()
    ).subscribe(val => console.log(val))*/
  }

  getData(param: number): Observable<string> {
    return of(`результат с сервера ${param}`).pipe(
      delay(1000)
    )
  }

}
