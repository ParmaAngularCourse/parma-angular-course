import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auto-main',
  templateUrl: './auto-main.component.html',
  styleUrls: ['./auto-main.component.css']
})
export class AutoMainComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    /*route.queryParams.subscribe(params => {
      console.log('Параметры queryParams auto-main');
      console.log(params);
    })*/
   }

  ngOnInit(): void {
  }

}
