import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, ReplaySubject } from "rxjs";
import { API_URL } from "src/api";
import { NewsPost } from "src/models/NewsPost";
import { NewsPostTag } from "src/models/NewsPostTag";

@Injectable({ providedIn: "root" })
export class DataRequestService {

    constructor(private readonly http: HttpClient) {

    }
    private newsSubject?: ReplaySubject<Array<NewsPost>>;

    public Get(): Observable<Array<NewsPost>> {
        return this.http.get<newsObj[]>(API_URL, {
            observe: 'body',
            responseType: 'json',
        }).pipe(
            map(item => item.map(x => {

                const post = new NewsPost();
                post.id = x.id;
                post.text = x.text;
                post.title = x.title;
                post.isSelected = false;
                post.tag = NewsPostTag.noTag
                console.log(post);
                return post
            }))
        );
        if (!this.newsSubject) {

            this.newsSubject = new ReplaySubject<NewsPost[]>(1);


            this.http.get<newsObj[]>(API_URL, {
                observe: 'body',
                responseType: 'json',
            }).pipe(
                map(item => item.map(x => {

                    const post = new NewsPost();
                    post.id = x.id;
                    post.text = x.text;
                    post.title = x.title;
                    post.isSelected = false;
                    post.tag = NewsPostTag.noTag
                    console.log(post);
                    return post
                }))
            ).subscribe((value) => this.newsSubject?.next(value))
        }
        //return this.newsSubject.asObservable();
    }
}

type newsObj = {
    id: number,
    text: string,
    title: string,
    date: string
}