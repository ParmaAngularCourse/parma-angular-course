import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { News } from 'src/app/model/news-type';

@Injectable({
  providedIn: 'root'
})
export class ChangeEditNewsService {

  public selectedNews!: News;
  public $safe = new Subject<News>();

  constructor() { }
}
