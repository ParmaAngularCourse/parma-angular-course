import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-header-page-switcher',
  templateUrl: './header-page-switcher.component.html',
  styleUrls: ['./header-page-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderPageSwitcherComponent implements OnInit {
  constructor(private authService: AuthServiceService, private router: Router) {
  }

  ngOnInit(): void {}

  logOut() {
    this.authService.LogOut();
    this.router.navigate(['auth']);
  }
}
