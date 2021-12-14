import { Component, OnInit } from '@angular/core';
import { EMPTY, from, interval, Observable, of, throwError, zip } from 'rxjs';
import { bufferCount, catchError, concatAll, concatMap, delay, exhaustMap, finalize, map, mergeAll, mergeMap, retry, retryWhen, switchMap, tap, timeout } from 'rxjs/operators';

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
