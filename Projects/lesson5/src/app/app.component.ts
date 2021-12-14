import { Component } from '@angular/core';
import { from, Observable } from 'rxjs';
import { distinctUntilChanged, take, takeLast, takeWhile, filter, first, single, tap } from 'rxjs/operators';

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
