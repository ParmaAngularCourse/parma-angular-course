import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auto-dtp',
  templateUrl: './auto-dtp.component.html',
  styleUrls: ['./auto-dtp.component.css']
})
export class AutoDtpComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { 
    console.log(this.router.getCurrentNavigation()?.extras.state);

    /*route.params.subscribe(params => {
      console.log('Параметры params auto-dtp');
      console.log(params);
    })

    route.data.subscribe(params => {
      console.log('Параметры data auto-dtp');
      console.log(params);
    })*/

    /*console.log('Параметры params auto-dtp');
    console.log(route.snapshot.params);

    console.log('Параметры data auto-dtp');
    console.log(route.snapshot.data);*/
  }

  ngOnInit(): void {
    //this.route.params.subscribe(() => console.log(window.history.state));
  }

  goToAutoMain() {
    this.router.navigate(['../../automain'], {relativeTo: this.route});
  }

}
