import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) { }

  title = 'Hello angular';
  isAuth() { return this.authService.isAuth(); }
  logout() { localStorage.removeItem('currentUser'); }
}
