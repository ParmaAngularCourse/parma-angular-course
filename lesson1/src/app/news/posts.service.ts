import { Injectable } from '@angular/core';
import { Information, JsonInformationListData } from './news-types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PostsService {

  //private postSubject?: BehaviorSubject<Information[]>;
  private ngUnsubscribe$!: Subject<number>;

  private searchString = "";
  
  /* = [
    {
      date: "1900-01-01",
      title: "Новость 1", 
      newsType: NewsTypes.Politic,
      text: "знайка шел гулять на речку, перепрыгнул через овечку"
    },
    {
      date: "1900-12-01",
      title: "Новость 2", 
      newsType: NewsTypes.Travel,
    },
    {
      date: "2000-01-01",
      title: "Новость 3", 
      newsType: NewsTypes.Economic,
    },
    {
      date: "2000-12-01",
      title: "Новость 4", 
      newsType: NewsTypes.Since,
    }    
  ];*/
  getSearchString(){
    return this.searchString;
  }
  setSearchString(searchString?: string){
    this.searchString = searchString ?? "";
  }

  public getPosts (searchString?: string, newsType?: number): Observable<Information[]>
  {  
    this.setSearchString(searchString);

      //this.postSubject = new BehaviorSubject<Information[]>([]);


      return this.getNewsFromServer(searchString, newsType)
          .pipe(takeUntil(this.ngUnsubscribe$));
          //.subscribe((value)=> {this.postSubject?.next(value)});
    
          //return this.postSubject.asObservable();
  }

  public savePost(param: Information){   

    /*
    let currentPostIndex = this.postSubject?.value.indexOf(param);
      
    if(currentPostIndex == -1) {
      this.postSubject?.value.push(param);
    }*/
  }

  public checkAll(){    
    //this.postSubject?.value.map(i=> i.isCheck = true);
  }

  public deleteSelected(){
    //this.postSubject?.next(this.postSubject?.value.filter(i=> !i.isCheck));
  }

  public  getIsAnySelect(){
    /*
    if(this.postSubject?.value)
      return this.postSubject?.value.filter(i=> i.isCheck).length > 0;
    */

    //return false; 
  }

  public deletePost(param: Information){    
    
    //this.postSubject?.value.splice(this.postSubject?.value.indexOf(param), 1);
  }

  public checkPost(param: Information){    
    param.isCheck = !param.isCheck;
  }

  constructor(private _http: HttpClient) {     
    this.ngUnsubscribe$ = new Subject();
  }
 

  private getNewsFromServer(searchString?: string, newsType?: number): Observable<Information[]>
  {
    let params = new HttpParams();

    if(searchString)
      params = params.set('searchString', searchString);

    if(newsType)
      params = params.set('newsType', newsType);


    /*
      // вариант для POST-запроса
     this._http.post('https://localhost:44314/AngularCourse/getNews', '{}').subscribe(
      (data) => this.informationList = data as Information[]
    );*/
    
    return  this._http.get<object>('https://localhost:44314/AngularCourse/getNews',{
      params: params
      }).pipe(
              map(response => (response  as JsonInformationListData).informationList)
      );
  }

  ngOnDestroy(){
    //this.postSubjectSubscription.unsubscribe(); // вариант отписки через Subscription

    this.ngUnsubscribe$.next(0);
    this.ngUnsubscribe$.complete();
  }
  



}
