import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
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
import {
  EMPTY,
  filter,
  map,
  of,
  skip,
  Subscriber,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { NewsPost } from 'src/models/NewsPost';
import { NewsPostTag } from 'src/models/NewsPostTag';
import { MyDateYearValidator } from 'src/validators/dateYearValidator';
import { IDeactivateComponent } from '../close-page.guard';
@Component({
  selector: 'app-news-post-modal-window',
  templateUrl: './news-post-modal-window.component.html',
  styleUrls: ['./news-post-modal-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPostModalWindowComponent
  implements IDeactivateComponent, OnInit, OnDestroy
{
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
  private hasChanged: boolean = false;
  private subscription!: Subscription;

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

    this.subscription = this.newsPostForm.valueChanges.subscribe((x) => {
      this.hasChanged = true;
    });
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
    this.newsPost = null;
    this.editedText = '';
    this.editedTitle = '';
    this.editedDate = '';
    this.editedTag = NewsPostTag.noTag;
    this.saveNews.emit(editedNewsPost);
    this.hasChanged = false;
    this.onCancel();
  }

  onCancel() {
    if (this.canDeactivate()) {
      this.isOpen = false;
      this.newsPost = null;
      this.cancel.emit();
    }
  }

  canDeactivate(): boolean {
    return this.hasChanged
      ? confirm('Имеются несохраненные изменения. Выйти со страницы?')
      : true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
