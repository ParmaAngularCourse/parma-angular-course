import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthServiceService,  private router: Router) { }

  ngOnInit(): void {
  }


  loginClick(username: string, pass: string){   

    if(!this.authService.isAuth())
      this.authService.login(username, pass);
    else
      this.authService.logout();

      
      if(this.authService.isAuth())
        this.router.navigate(['/news']);
  } 

}
