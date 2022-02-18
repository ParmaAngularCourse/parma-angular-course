import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { Information, NewsTypes, UserRightsObj } from '../news-types';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'], 
  changeDetection: ChangeDetectionStrategy.Default
})
export class PostEditorComponent implements OnInit, OnDestroy  {


  @Input("edit_post_data") edit_post!: Information;
  @Input("user_data") userRights!: UserRightsObj;
  
  @Output() savePost: EventEmitter<Information> = new EventEmitter(); 
  @Output() cancelEditPost: EventEmitter<boolean> = new EventEmitter(); 
  
  public localData: Information = {
    date: "",
    title: "",
    text: "",
  };

  editForm!: FormGroup;

  public isEditorOpen: boolean = false;
  private ngUnsubscribeValueChange$: Subject<void> = new Subject();
  
  constructor() { }


  ngOnInit(): void {

    this.initFormGroup();
  }

  ngOnDestroy() {
    this.ngUnsubscribeValueChange$.next();
    this.ngUnsubscribeValueChange$.complete();
  }

  get date() { return this.editForm.get('date'); }
  get title() { return this.editForm.get('title'); }
  get text() { return this.editForm.get('text'); }
  get newsType() { return this.editForm.get('newsType'); }
  get newsTypeError() {
    
    let errors = this.editForm.controls['newsType'].errors;
    if(errors!= null)
      return  errors['message'];

      return null;
  }

  initFormGroup()
  {
    this.editForm = new FormGroup({
      date: new FormControl(this.localData.date, [Validators.required]),
      title: new FormControl(this.localData.title, [Validators.required]),
      text: new FormControl(this.localData.text, [Validators.minLength(5)]),
      newsType: new FormControl(this.localData.newsType, []),
    }/*, {updateOn: 'blur'}*/);

    this.editForm.valueChanges
                .pipe(takeUntil(this.ngUnsubscribeValueChange$))
                .subscribe((value)=>{
                  this.localData.date = value.date;
                  this.localData.title = value.title;
                  this.localData.text = value.text == undefined ? "": value.text;
                  this.localData.newsType = value.newsType == undefined ? NewsTypes.Politic: value.newsType;
                });
  }

  show(isShow: boolean)
  {
    this.isEditorOpen = isShow;
  }


  ngOnChanges(): void {

    this.localData.date = this.edit_post?.date;
    this.localData.title = this.edit_post?.title;
    this.localData.text = this.edit_post?.text == undefined ? "": this.edit_post?.text;
    this.localData.newsType = this.edit_post?.newsType == undefined ? NewsTypes.Politic: this.edit_post?.newsType;

    this.initFormGroup();
  }

  clickPostEditorSaveButton(param: Information){
    param.date = this.localData.date;
    param.title = this.localData.title;
    param.text = this.localData.text;
    param.newsType = this.localData.newsType;

    this.savePost.emit(param);
  }

  clickPostEditorCancelButton(){
    this.cancelEditPost.emit();
  }

}
