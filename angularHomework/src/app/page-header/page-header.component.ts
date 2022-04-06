import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-authservice';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  authLink: "Log in" | "Log out" = "Log in"

  constructor(private userAuthService: UserAuthService) {
    this.authLink = userAuthService.isAuthorised() ? "Log out" : "Log in";
   }

  ngOnInit(): void {
  }

}
