import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css']
})
export class RealEstateComponent implements OnInit {

  constructor(private route: ActivatedRoute) { 
    route.data.subscribe(params => {
      console.log('Параметры data');
      console.log(params);
    })
  }

  ngOnInit(): void {
  }

}
