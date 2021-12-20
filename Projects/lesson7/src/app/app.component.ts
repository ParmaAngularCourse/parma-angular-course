import { Component, isDevMode } from '@angular/core';
import { combineLatest, concat, forkJoin, fromEvent, interval, merge, Observable, of, zip } from 'rxjs';
import { delay, map, mapTo, pairwise, reduce, scan, share, startWith, take, toArray, withLatestFrom } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lesson7';

  data: number = -1;
  constructor(private testService: TestService) {

    let o$ = of(1, 2, 3, 4, 5);
    o$.pipe(
      scan((acc, current) => acc+current)
    ).subscribe({
      next: (value: any) => console.log('Next: ', value),
      complete: () => console.log('Complete!'),
      error: (error) => console.log('Error: ', error)
    });

    /*let o$ = interval(1000);
    o$.pipe(
      take(10),
      toArray()
    ).subscribe({
      next: (value: any) => console.log('Next: ', value),
      complete: () => console.log('Complete!'),
      error: (error) => console.log('Error: ', error)
    });*/

    /*let o$ = fromEvent(document, 'click') as Observable<PointerEvent>;
    o$.pipe(
      mapTo(null)
    ).subscribe({
      next: (value: any) => console.log('Next: ', value),
      complete: () => console.log('Complete!'),
      error: (error) => console.log('Error: ', error)
    });*/

    /*let o$ = fromEvent(document, 'click') as Observable<PointerEvent>;
    o$.pipe(
      pairwise(),
      map(pair => {
        const x0 = pair[0].clientX;
        const y0 = pair[0].clientY;
        const x1 = pair[1].clientX;
        const y1 = pair[1].clientY;
        return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
      })
    ).subscribe({
      next: (value: any) => console.log('Next: ', value),
      complete: () => console.log('Complete!'),
      error: (error) => console.log('Error: ', error)
    });*/

    /*let timer1$ = interval(1000).pipe(take(10));
    let timer2$ = interval(2000).pipe(take(6));
    let timer3$ = interval(500).pipe(take(10));

    let o$: Observable<any> = merge(
      timer1$, timer2$, timer3$
    );
    o$.subscribe({
      next: (value: any) => console.log('Next: ', value),
      complete: () => console.log('Complete!'),
      error: (error) => console.log('Error: ', error)
    });*/

    /*let o$ = fromEvent(document, 'click');
    let timer$ = interval(1000);
    o$.pipe(withLatestFrom(timer$)).subscribe({
      next: (value: any) => console.log('Next: ', value),
      complete: () => console.log('Complete!'),
      error: (error) => console.log('Error: ', error)
    });*/

    /*let o$: Observable<number[]> = forkJoin(
      [of(1).pipe(delay(1000), startWith(-1)),
        of(5).pipe(delay(5000), startWith(-1)),
        of(10).pipe(delay(10000), startWith(-1))]
    );
    o$.subscribe({
      next: (value: any) => console.log('Next: ', value),
      complete: () => console.log('Complete!'),
      error: (error) => console.log('Error: ', error)
    });*/

    /*let sequence$ = interval(1000).pipe(share());
    let sub = sequence$.subscribe(v => { console.log(`Sub 1 => ${v}`); });
    setTimeout(() => { sub.unsubscribe(); }, 2000);
    setTimeout(() => { sequence$.subscribe(v => { console.log(`Sub 2 => ${v}`); }) }, 5000);*/

    /*console.log(environment.apiKey);

    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }*/
   }

  ngOnInit(): void {
    this.data = this.testService.getData();
  }
}
