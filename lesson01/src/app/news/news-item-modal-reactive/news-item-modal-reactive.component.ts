import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {NewsItemModel} from "../news-types";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../services/news.service";

@Component({
  selector: 'app-news-item-modal-reactive',
  templateUrl: './news-item-modal-reactive.component.html',
  styleUrls: ['./news-item-modal-reactive.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemModalReactiveComponent implements OnInit {

  editedItem!: NewsItemModel;
  newsItemFormGroup! : FormGroup;

  get dateField() : FormControl {
    return this.newsItemFormGroup.get('dateField') as FormControl;
  }
  get headField() : FormControl {
    return this.newsItemFormGroup.get('headField') as FormControl;
  }
  get descField() : FormControl {
    return this.newsItemFormGroup.get('descField') as FormControl;
  }
  get tagsField() : FormControl {
    return this.newsItemFormGroup.get('tagsField') as FormControl;
  }


  constructor(private _newsService: NewsService,
              private _cd : ChangeDetectorRef,
              private _route: ActivatedRoute,
              private _router: Router) {}

  ngOnInit(): void {
    this.newsItemFormGroup = new FormGroup({
      dateField : new FormControl('', [Validators.required, dateNotFutureValidator]),
      headField : new FormControl('', [Validators.required]),
      descField : new FormControl('', [Validators.required]),
      tagsField : new FormControl('', [Validators.required])
    });

    this.newsItemFormGroup.valueChanges
      .subscribe(
        (value => {
          this.editedItem.date = new Date(value.dateField);
          this.editedItem.head = value.headField;
          this.editedItem.desc = value.descField;
          this.editedItem.tag = value.tagsField;
        })
      )

    this._route.url.subscribe(value => {
      switch (value[0].path){
        case "add" : this.show(); break;
        case "edit" : {
          this._route.data.subscribe({
            next: value => {
              this.show(value.newsItem);
            }
          })
          break;
        }
        default: this.cancel(); break;
      }
    });

  }

  show(item?: NewsItemModel) {
    if(item != undefined){
      this.editedItem = new NewsItemModel(item.id, item.date, item.head, item.desc, item.tag);
      this.editedItem.selected = item.selected;
    } else {
      this.editedItem = new NewsItemModel(-1, new Date(), "" , "", "");
    }

    this.newsItemFormGroup.setValue({
      headField : this.editedItem.head,
      dateField : this.editedItem.dateLocal,
      descField : this.editedItem.desc,
      tagsField : this.editedItem.tag
    }, {emitEvent: false})

    this._cd.detectChanges();
  }

  cancel() {
    this._router.navigate([{ outlets: {modal: null}}], {relativeTo: this._route.parent}).then(value => {
      if(value) {
        this.newsItemFormGroup.reset();
      }
    });
  }

  saveItem() {
    this._router.navigate([{ outlets: {modal: null}}], {relativeTo: this._route.parent}).then(value => {
      if(value) {
        if(this.editedItem.id > 0)
          this._newsService.editNewsItem(this.editedItem);
        else
          this._newsService.addNewsItem(this.editedItem);
      }
    });
  }
}

function dateNotFutureValidator(formControl: FormControl) : null | { mess: string } {
  if(new Date(formControl.value) > new Date()){
    return { mess: "Дата не может быть в будущем"}
  }
  return null;
}
