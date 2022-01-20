import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EMPTY, map, of, switchMap, tap } from 'rxjs';
import { NewsPost } from 'src/models/NewsPost';
import { NewsPostTag } from 'src/models/NewsPostTag';
import { MyDateYearValidator } from 'src/validators/dateYearValidator';
@Component({
  selector: 'app-news-post-modal-window',
  templateUrl: './news-post-modal-window.component.html',
  styleUrls: ['./news-post-modal-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPostModalWindowComponent {
  @Input()
  newsPost: NewsPost | null | undefined;
  @Input() isOpen = false;
  @Input() operationTitle = '';

  @Output() saveNews = new EventEmitter<NewsPost>();
  @Output() cancel = new EventEmitter<void>();

  @Input() userPermissions = false;

  newsTags = Object.values(NewsPostTag).filter((x) => x != NewsPostTag.noTag);

  newsPostForm!: FormGroup;

  private editedText = '';
  private editedTitle = '';
  private editedDate!: string;
  private editedTag = NewsPostTag.noTag;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.newsPostForm = new FormGroup({
      textControl: new FormControl(this.newsPost?.text, [Validators.required]),
      titleControl: new FormControl(this.newsPost?.title, [
        Validators.required,
      ]),
      dateControl: new FormControl(this.newsPost?.uploadDate, [
        Validators.required,
        MyDateYearValidator.dateValidator,
      ]),
      radioControl: this.fb.control({
        newsTags: this.newsTags,
        selectedTag: this.newsPost?.tag,
      }),
    });

    this.newsPostForm.valueChanges
      .pipe(
        tap(() => console.log('alive request inner modal change')),
        switchMap((switchVal) => {
          return of(switchVal).pipe(
            map((form) => {
              this.editedTitle = form.titleControl;
              this.editedText = form.textControl;
              this.editedDate = form.dateControl;
              this.editedTag = form.radioControl?.selectedTag;
              return form;
            })
          );
        })
      )
      .subscribe((form) => console.log('request end inner modal change' + JSON.stringify(form)));
  }

  ngOnChanges() {
    this.newsPostForm?.setValue({
      textControl: this.newsPost?.text,
      titleControl: this.newsPost?.title,
      dateControl: this.newsPost?.uploadDate,
      radioControl: {
        newsTags: this.newsTags,
        selectedTag: this.newsPost?.tag,
      },
    });
  }

  onEditSave() {
    console.log(this.editedTag);
    const currentEditablePost = new NewsPost();
    currentEditablePost.id = this.newsPost?.id ?? -1;
    currentEditablePost.title =
      this.editedTitle === '' ? this.newsPost?.title ?? '' : this.editedTitle;
    currentEditablePost.text =
      this.editedText === '' ? this.newsPost?.text ?? '' : this.editedText;
    currentEditablePost.uploadDate =
      this.editedDate === '' ? this.newsPost!.uploadDate : this.editedDate;
    currentEditablePost.tag =
      this.editedTag === NewsPostTag.noTag ? NewsPostTag.noTag : this.editedTag;
    const editedNewsPost = new NewsPost(currentEditablePost);
    console.log(editedNewsPost);
    this.newsPost = null;
    this.editedText = '';
    this.editedTitle = '';
    this.editedDate = '';
    this.editedTag = NewsPostTag.noTag;
    this.saveNews.emit(editedNewsPost);
    this.onCancel();
  }

  onCancel() {
    this.isOpen = false;
    this.newsPost = null;
    this.cancel.emit();
  }

  onTextInputChanged = (value: string) => {
    this.editedText = value;
    console.log(value);
  };

  onTitleInputChanged = (value: string) => {
    this.editedTitle = value;
  };

  onRadioChange = (index: number) => {
    this.editedTag = this.newsTags[index];
  };

  onDateInputChanged = (value: string) => {
    this.editedDate = value;
  };
}
