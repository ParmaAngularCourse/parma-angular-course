import { Component, OnInit } from '@angular/core';
import { TestService } from '../../test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data!: number;
  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.data = this.testService.getData();
  }

}
