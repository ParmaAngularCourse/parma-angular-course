import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { filter } from 'rxjs/internal/operators/filter';
import { first } from 'rxjs/internal/operators/first';
import { single } from 'rxjs/internal/operators/single';
import { tap } from 'rxjs/internal/operators/tap';
import { distinctUntilChanged, take, takeLast, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lesson2';

  onClick() {
    let o: Observable<number> = from([1, 2, 2, 2, 3, 3, 2]).pipe(      
      takeWhile(val => val<3)
    );
    o.subscribe({
      next: (value: number) => console.log('Next: ', value),
      complete: () => console.log('Complete!'),
      error: (error) => console.log('Error: ', error)
    });
  }
}
