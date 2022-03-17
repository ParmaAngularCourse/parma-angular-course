import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lesson7';

  loginText = this.getLoginText();
  //isUserLogin = false;
  //newsLink = 'news';


 // editForm!: FormGroup;
 // currentNewsType = 1;
  //private ngUnsubscribeValueChange$: Subject<void> = new Subject();

  //get newsTypeFilter() { return this.editForm.get('newsTypeFilter'); }


    constructor(private authService: AuthServiceService,  private router: Router)
    {
      
    }


  ngOnInit(): void {

    //this.initFormGroup();
  }

  /*

  initFormGroup()
  {
    this.editForm = new FormGroup({
      newsTypeFilter: new FormControl(this.currentNewsType, []),
    });

    this.editForm.valueChanges
                .pipe(takeUntil(this.ngUnsubscribeValueChange$))
                .subscribe((value)=>{
                  this.currentNewsType = value.newsTypeFilter == undefined ? NewsTypes.Politic: value.newsTypeFilter;
                    
                  this.newsLink = 'news/'+this.currentNewsType;
                  console.log(this.newsLink);

                  // currentNewsType возомжно не нужен - перенаправлять с параметром value.newsTypeFilter

                });
  }

  ngOnDestroy() {
    this.ngUnsubscribeValueChange$.next();
    this.ngUnsubscribeValueChange$.complete();
  }
*/







  getLoginText(){   
    if(this.authService.isAuth())
      return 'Выход';
    else
      return 'Вход';
  }

}
