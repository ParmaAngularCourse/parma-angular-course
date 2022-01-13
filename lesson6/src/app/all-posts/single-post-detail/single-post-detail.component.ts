import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PostObj, PostType } from '../post-types';
import { UserType } from '../users';
import { required } from '../validators';
@Component({
  selector: 'app-single-post-detail',
  templateUrl: './single-post-detail.component.html',
  styleUrls: ['./single-post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostDetailComponent {
  private ngUnsubscribe$: Subject<void> = new Subject();

  private _post: PostObj = {
    id: -1,
    date: '',
    title: '',
    text: '',
    isSelected: false,
    postType: null,
  };
  get post() {
    return this._post;
  }

  @Input() set post(value) {
    this._post = value;
    this.setControlValues(this._post);
    this.cdr.markForCheck();
  }

  @Output() saveNewPostEvent: EventEmitter<PostObj> =
    new EventEmitter<PostObj>();
  @Output() closePopupEvent: EventEmitter<void> = new EventEmitter();

  PostType: PostType = PostType.politic;

  @Input() user!: UserType;

  //typePostControl!: FormControl;
  //datePostControl!: FormControl;
  //titlePostControl!: FormControl;
  //textPostControl!: FormControl;

  groupPostControl!: FormGroup;

  constructor(private cdr: ChangeDetectorRef) {}

  private setControlValues(post: PostObj) {
    // this.datePostControl.setValue(post.date);
    // this.typePostControl.setValue(post.postType);
    // this.titlePostControl.setValue(post.title);
    // this.textPostControl.setValue(post.text);
    // this.groupPostControl.get('datePostControl')?.setValue(post.date);
    // this.groupPostControl.get('typePostControl')?.setValue(post.postType);
    // this.groupPostControl.get('titlePostControl')?.setValue(post.title);
    // this.groupPostControl.get('textPostControl')?.setValue(post.text);
    this.groupPostControl.setValue({
      datePostControl: post.date,
      typePostControl: post.postType,
      titlePostControl: post.title,
      textPostControl: post.text
    })
  }

  savePostHandler() {
    this.saveNewPostEvent.emit(this.post);
  }

  cancelSavePostHandler() {
    this.closePopupEvent.emit();
  }
  ngOnInit() {
    // this.datePostControl = new FormControl(this.post.date, [required('Дата')]);
    // this.typePostControl = new FormControl(this.post.postType, [
    //   required('Тип новости'),
    // ]);
    // this.titlePostControl = new FormControl(this.post.title, [
    //   required('Заголовок'),
    // ]);
    // this.textPostControl = new FormControl(this.post.text, [required('Текст')]);

    this.groupPostControl = new FormGroup({
      datePostControl: new FormControl(this.post.date, [required('Дата')]),
      typePostControl: new FormControl(this.post.postType, [
        required('Тип новости'),
      ]),
      titlePostControl:  new FormControl(this.post.title, [
        required('Заголовок'),
      ]),
      textPostControl: new FormControl(this.post.text, [required('Текст')])
    });

    // this.datePostControl.valueChanges
    //   .pipe(takeUntil(this.ngUnsubscribe$))
    //   .subscribe((value) => (this.post.date = value));
    // this.typePostControl.valueChanges
    //   .pipe(takeUntil(this.ngUnsubscribe$))
    //   .subscribe((value) => (this.post.postType = value));
    // this.titlePostControl.valueChanges
    //   .pipe(takeUntil(this.ngUnsubscribe$))
    //   .subscribe((value) => (this.post.title = value));
    // this.textPostControl.valueChanges
    //   .pipe(takeUntil(this.ngUnsubscribe$))
    //   .subscribe((value) => (this.post.text = value));

      this.groupPostControl.valueChanges
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((value) => {
          console.log(value);
          console.log(value['datePostControl']);
          this.post.date = value['datePostControl'];
          this.post.postType = value['typePostControl'];
          this.post.title = value['titlePostControl'];
          this.post.text = value['textPostControl'];
        });
      // .get('datePostControl')?.valueChanges
      //   .pipe(takeUntil(this.ngUnsubscribe$))
      //   .subscribe((value) => (this.post.date = value));
      // this.groupPostControl.get('typePostControl')?.valueChanges
      //   .pipe(takeUntil(this.ngUnsubscribe$))
      //   .subscribe((value) => (this.post.postType = value));
      // this.groupPostControl.get('titlePostControl')?.valueChanges
      //   .pipe(takeUntil(this.ngUnsubscribe$))
      //   .subscribe((value) => (this.post.title = value));
      // this.groupPostControl.get('textPostControl')?.valueChanges
      //   .pipe(takeUntil(this.ngUnsubscribe$))
      //   .subscribe((value) => (this.post.text = value));
  }

  ngDoCheck() {
    console.log('single-post-detail');
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
