import { Injectable } from '@angular/core';
import { Report } from './news/news-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private newsSubject?: BehaviorSubject<Report[]>;

  public getNews(): Observable<Report[]> {
    if (!this.newsSubject) {
      this.newsSubject = new BehaviorSubject<Report[]>([]);
      this.http.get<Report[]>("https://localhost:44360/News").subscribe((x: any) => this.newsSubject?.next(x));
    }
    return this.newsSubject.asObservable();
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
