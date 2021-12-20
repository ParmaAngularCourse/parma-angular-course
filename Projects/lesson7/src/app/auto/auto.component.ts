import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    /*route.params.subscribe(params => {
      console.log('Параметры params auto');
      console.log(params);
    });

    route.queryParams.subscribe(params => {
      console.log('Параметры queryParams auto');
      console.log(params);
    })*/
   }

  ngOnInit(): void {
    //this.router.events.pipe(filter(e=> e instanceof NavigationStart)).subscribe((event: Event) => console.log(event))
  }

  goToDTP() {
    //this.router.navigate(['autodtp/12', { param: 'param_value'}], {relativeTo: this.route, queryParams: { id: 10}, state: {hello:'world'}});
    this.router.navigateByUrl('auto/autodtp/12;param=param_value?id=10000', {replaceUrl: false, skipLocationChange: false, state: {hello:'world'}});
    //this.router.navigate([{outlets: {menu: 'popupmenu'}}]);
  }
}
