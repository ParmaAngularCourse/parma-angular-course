import { HttpErrorResponse } from '@angular/common/http';
import { GeneratedFile } from '@angular/compiler';
import { ChangeDetectorRef, Injectable, Predicate } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsPost } from 'src/models/NewsPost';
import { NewsPostTag } from 'src/models/NewsPostTag';
import { toDateString } from 'src/utils/DateUtils';
import { DataRequestService } from './dataRequestService';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private readonly requestService: DataRequestService) {}

  public GetAll(): Observable<Array<NewsPost>> {
    return this.requestService.Get();
  }

  public Add(item: NewsPost): void {
    //item.id = this.news.length + 1;
    this.requestService.Add(item);
  }

  public Update(item: NewsPost): void {
    this.requestService.Update(item);
  }

  public Delete(keys: Array<number>) {
    this.requestService.Delete(keys);
  }

  // Генерация рандомной даты
  private randomDate(start: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (new Date().getTime() - start.getTime())
    );
  }

  // Генерация рандомной строки нужной длины
  private randomString(length: number) {
    var result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
