import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lesson8';

  loginText = this.getLoginText();
  isUserLogin = this.authService.isAuth();

    constructor(private authService: AuthServiceService,  private router: Router)
    {
      
    }


  ngOnInit(): void {

  }

  ngDoCheck(): void {
    this.isUserLogin = this.authService.isAuth();
    this.loginText = this.getLoginText();

  }


  getLoginText(){   
    if(this.authService.isAuth())
      return 'Выход';
    else
      return 'Вход';
  }


  loginClick(){   

    if(this.authService.isAuth())
      this.authService.logout();

      if(!this.authService.isAuth())
        this.router.navigate(['/login']);
  } 




}
