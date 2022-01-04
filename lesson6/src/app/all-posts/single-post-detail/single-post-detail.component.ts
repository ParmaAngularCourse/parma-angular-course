import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostObj, PostType } from '../post-types';
import { UserType } from '../users';
import { required } from '../validators';
@Component({
  selector: 'app-single-post-detail',
  templateUrl: './single-post-detail.component.html',
  styleUrls: ['./single-post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePostDetailComponent {
    private _post: PostObj = {id:-1, date:"", title: "", text:"", isSelected: false, postType: null};
    get post() {
      return this._post;
    }
    @Input() set post(value){
      this._post = value;
      this.setControlValues(this._post);
      this.cdr.markForCheck();
    };
    @Output() saveNewPostEvent: EventEmitter<PostObj> = new EventEmitter<PostObj>();
    @Output() closePopupEvent: EventEmitter<void> = new EventEmitter();

    PostType: PostType = PostType.politic;

    @Input() user!: UserType;

    typePostControl!: FormControl;
    datePostControl!: FormControl;
    titlePostControl!: FormControl;
    textPostControl!: FormControl;

    constructor(private cdr: ChangeDetectorRef) {}

  private setControlValues(post: PostObj) {
    this.datePostControl.setValue(post.date);
    this.typePostControl.setValue(post.postType);
    this.titlePostControl.setValue(post.title);
    this.textPostControl.setValue(post.text);
  }

    savePostHandler() {
      this.saveNewPostEvent.emit(this.post);
    }

    cancelSavePostHandler(){
      this.closePopupEvent.emit();
    }
    ngOnInit() {
      this.datePostControl = new FormControl(this.post.date, [required("Дата")])
      this.typePostControl = new FormControl(this.post.postType, [required("Тип новости")]);
      this.titlePostControl = new FormControl(this.post.title, [required("Заголовок")]);
      this.textPostControl = new FormControl(this.post.text, [required("Текст")]);

      this.datePostControl.valueChanges.subscribe((value) => this.post.date = value);
      this.typePostControl.valueChanges.subscribe((value) => this.post.postType = value);
      this.titlePostControl.valueChanges.subscribe((value) => this.post.title = value);
      this.textPostControl.valueChanges.subscribe((value) => this.post.text = value);
    }

    ngDoCheck() {
      console.log('single-post-detail');
    }
}
