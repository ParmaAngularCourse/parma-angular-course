import { Injectable } from '@angular/core';
import { Report } from './news/news-types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { combineAll, concat, flatMap, map, mergeAll, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {
    this.http.get<Report[]>(this.newsGetApi).subscribe((x: any) => this.newsSubject?.next(x));
  }

  private newsSubject = new BehaviorSubject<Report[]>([]);
  newsGetApi = "https://localhost:44360/News";

  public getNews(filter: string): Observable<Report[]> {
    let rowNum = 1;
    if (filter != "") this.http.get<Report[]>(this.newsGetApi, { params: { filter: filter } }).pipe(
      mergeAll(),
      map((x: Report) => {
        x.rowNum = rowNum <= 3 ? rowNum++ : rowNum = 1;
        console.log(x);
        return (x);
      }),
      toArray()
    ).subscribe((x: any) => this.newsSubject?.next(x));
    return this.newsSubject;
  }

  public saveReport(report: Report, i: number) {
    if (this.newsSubject) {
      let news = this.newsSubject.value;
      if (i < news.length) news[i] = report;
      else news.push(report);
    }
  }

  public deleteReport(i: number) {
    if (this.newsSubject) {
      let news = this.newsSubject.value;
      news.splice(i, 1);
    }
  }

  public deleteCheckedReports() {
    if (this.newsSubject) {
      let news = this.newsSubject.value;
      news = news.filter((x: { isChecked: any; }) => !x.isChecked);
      this.newsSubject.next(news);
    }
  }
}
