import { Component, ElementRef, ViewChild } from '@angular/core';
import { EMPTY, fromEvent, Observable, Subscription } from 'rxjs';
import { ObjUser } from './types';
import { debounceTime, delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lesson3';
  counter = 0;
  someDate = 1311346453064;
  user: ObjUser = { surname: 'Иванова', name: 'Алла', gender: 0};
  users: ObjUser[] = 
  [
    { surname: 'Иванова', name: 'Алла', gender: 0},
    { surname: 'Петрова', name: 'Ольга', gender: 0},
    { surname: 'Сидоров', name: 'Олег', gender: 1},
    { surname: 'Чацкий', name: 'Пётр', gender: 1}
  ];

  @ViewChild('newUser') newUser!: ElementRef;
  o$!: Observable<any>;
  subscription1!: Subscription;
  subscription2!: Subscription;
  addUser(val: string) {
    this.users.push({
      name: val,
      gender: 1,
      surname: 'Иванов'
    });

    this.o$ = fromEvent(this.newUser.nativeElement, 'keyup').pipe(
      delay(3000),
      map((event: any) => { console.log(event.target.value); return event.target.value; })
    );
    /*this.subscription1 = this.o$.subscribe({
      next: (value: any) => console.log('Next1: ', value),
      complete: () => console.log('Complete1!'),
      error: (error: any) => console.log('Error1: ', error)
    });

    setTimeout(() => {
      this.subscription2 = this.o$.subscribe({
        next: (value: any) => console.log('Next2: ', value),
        complete: () => console.log('Complete2!'),
        error: (error: any) => console.log('Error2: ', error)
      });
    }, 7000);    */
  }

  changeValue(value: 0|1) {
    //console.log(value);
    return value ? 'М':'Ж';
  }

  clickUns() {
    /*this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();*/
  }
}
