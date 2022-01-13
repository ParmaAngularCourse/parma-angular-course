import { Injectable } from '@angular/core';
import { Report } from './news/news-types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private newsSubject = new BehaviorSubject<Report[]>([]);
  newsGetApi = "api/News";
  currentFilter: string | null = null;
  currentType: string | null = null;

  public getNews(filter: string, type: string): Observable<Report[]> {
    if (filter != this.currentFilter || type != this.currentType) {
      this.currentFilter = filter; this.currentType = type;
      this.http.get<Report[]>(this.newsGetApi, { params: { filter: filter, type: type } })
        .subscribe((x: any) => this.newsSubject?.next(x));
    }
    return this.newsSubject;
  }

  public saveReport(report: Report, i: number) {
    if (this.newsSubject) {
      let news = this.newsSubject.value;
      if (i < news.length) {
        this.http.post<void>("api/NewsUpdate", report).subscribe();
        this.newsSubject.next(news.map((x: Report, idx: number) => i == idx ? report : x));
      }
      else {
        this.http.post<Report>(this.newsGetApi, report).subscribe((x: Report) => this.newsSubject.next([...news, x]));
      }
    }
  }

  public deleteReport(i: number) {
    if (this.newsSubject) {
      let news = this.newsSubject.value;
      this.http.post<void>("api/NewsDelete", news.find((x: Report, idx: number) => i == idx)).subscribe();
      this.newsSubject.next(news.filter((x: Report, idx: number) => i != idx));
    }
  }

  public deleteCheckedReports() {
    if (this.newsSubject) {
      let news = this.newsSubject.value
      news.filter((x: { isChecked: any; }) => x.isChecked).forEach((x: Report) => this.http.post<void> ("api/NewsDelete", x).subscribe());
      this.newsSubject.next(news.filter((x: { isChecked: any; }) => !x.isChecked));
    }
  }
}
