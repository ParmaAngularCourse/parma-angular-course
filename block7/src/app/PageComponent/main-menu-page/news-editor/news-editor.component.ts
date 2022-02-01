import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ICanDeactivateComponent } from 'src/model/ICanDeactivateComponent';
import { INewsData } from 'src/model/INewsData';
import { TypeNews } from 'src/model/TypeNews';
import { NewsService } from '../../../service/news.service';
import { NewsDateValidator } from '../../../Validators/NewsDateValidators';
import { NotEmptyStringValidator } from '../../../Validators/NotEmptyStringValidator';

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsEditorComponent implements OnInit, OnDestroy, ICanDeactivateComponent {
  public currentNews: INewsData; 
  public editForm!: FormGroup;
  private unsubscriptionSubj!:Subject<void>
  public headerTitle: string = '';
  private saved: boolean = true;

  public get newsDateControl():FormControl{
    return this.editForm.controls['newsDateControl'] as FormControl;
  }

  public get newsTitleControl():AbstractControl{
    return this.editForm.controls['newsTitleControl'];
  }

  public get newsBodyControl():AbstractControl{
    return this.editForm.controls['newsBodyControl'];
  }

  public get newsTypeControl():AbstractControl{
    return this.editForm.controls['newsTypeControl'];
  }

  constructor(
    private newsService:NewsService,
    private cd:ChangeDetectorRef,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router){
    this.currentNews = this.getDefaultNewsData();
  }

  canDeactivate() : boolean | Observable<boolean>{     
    if(!this.saved){
        return confirm("Вы хотите покинуть страницу?");
    }
    else{
        return true;
    }
  }

  ngOnInit(): void {
    this.unsubscriptionSubj = new Subject();
    this.editForm = this.fb.group(
      {        
        newsDateControl: [this.getDateToLocalStringFormat(this.currentNews.date), 
        { 
          validators: NewsDateValidator('Дата')
        }],
        newsTitleControl: [this.currentNews.title, [NotEmptyStringValidator('Заголовок')]],
        newsBodyControl: [this.currentNews.body, [NotEmptyStringValidator('Текст')]],
        newsTypeControl: [this.currentNews.type] 
      }
    );
    
    this.newsDateControl.valueChanges.pipe(takeUntil(this.unsubscriptionSubj)).subscribe((value:string)=> this.onChangeNewsDate(value))
    this.newsTitleControl.valueChanges.pipe(takeUntil(this.unsubscriptionSubj)).subscribe((value:string)=> this.onChangeNewsTitle(value))
    this.newsBodyControl.valueChanges.pipe(takeUntil(this.unsubscriptionSubj)).subscribe((value:string)=> this.onChangeNewsBody(value))
    this.newsTypeControl.valueChanges.pipe(takeUntil(this.unsubscriptionSubj)).subscribe((value:TypeNews)=> this.onChangeNewsType(value))

    this.route.params
    .pipe(
      map(paramObj => paramObj['newsId'] as number),
      switchMap(newsId => this.newsService.GetNewsById(newsId)),
      takeUntil(this.unsubscriptionSubj)
    )
    .subscribe(news => this.openForm(news))   

    this.route.url
    .pipe(takeUntil(this.unsubscriptionSubj))
    .subscribe(url=>{
      if(url[0]?.path === "add")
      {
        this.headerTitle = 'Добавить новость'
      }
      else{
        this.headerTitle = 'Изменить новость'
      }
      this.cd.markForCheck()
    })
    this.saved = true;
  }

  saveForm() {
    this.newsService.addNews(this.currentNews);
    this.saved = true;     
    this.closeForm();
  }

  openForm(newsData:INewsData|null){
    if(newsData){
      this.currentNews = { ...newsData };
    }
    else{
      this.currentNews = this.getDefaultNewsData();
    }

    this.editForm.patchValue({
      newsDateControl: this.getDateToLocalStringFormat(this.currentNews.date),
      newsTitleControl: this.currentNews.title,
      newsBodyControl: this.currentNews.body,
      newsTypeControl: this.currentNews.type
    });

    this.cd.markForCheck();
  }

  closeForm() {
    this.router.navigate([{ outlets: { editForm: null }}], { relativeTo: this.route.parent, queryParamsHandling: 'merge'});
  }

  private getDateToLocalStringFormat(date:Date):string|null{
    return this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss')
  }

  onChangeNewsDate(value:string){
    if(value){    
      this.currentNews.date = new Date(value);
      this.saved = false;
    }
  }

  onChangeNewsTitle(value:string){
    this.currentNews.title = value;
    this.saved = false;
  }

  onChangeNewsBody(value:string){
    this.currentNews.body = value;
    this.saved = false;
  }

  onChangeNewsType(value:TypeNews){
    this.currentNews.type = value;
    this.saved = false;
  }

  ngDoCheck(){
    console.log('app-news-editor - ' + this.currentNews.title);
  }

  private getDefaultNewsData():INewsData{
    return {
      id: -1,
      date: new Date(),
      title: "Заголовок",
      body: "Текст",
      type: TypeNews.Type0_None
    }
  }

  ngOnDestroy(){
    this.unsubscriptionSubj.next();
    this.unsubscriptionSubj.complete();
  }
}
