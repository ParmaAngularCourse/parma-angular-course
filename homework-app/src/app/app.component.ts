import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'homework-app';
  private ngUnsubscribe$: Subject<boolean>;

  constructor(private usersService: UsersService, private cdr: ChangeDetectorRef,
    private router: Router) {
    this.ngUnsubscribe$ = new Subject();    
  }

  ngOnInit() {

  }

  hasAuthorizedUser() {
    return this.usersService.hasCurrentUserName();
  }

  logout() {
    this.usersService.logout().pipe(
      takeUntil(this.ngUnsubscribe$))
      .subscribe( (data) => {
          this.router.navigate(['/auth']);
        }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
