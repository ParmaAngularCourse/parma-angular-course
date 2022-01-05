import { Injectable, Predicate } from "@angular/core";
import { NewsPost } from "src/models/NewsPost";
import { NewsPostTag } from "src/models/NewsPostTag";
import { toDateString } from "src/utils/DateUtils";
import { DataRequestService } from "./dataRequestService";


@Injectable({
    providedIn: 'root',

})
export class NewsService {

    constructor(private readonly requestService: DataRequestService) {
       this. ExtractData();
    }
    

    private news!: Array<NewsPost>;

    // Мок сервиса, отдающего новости
    private Generate(): Array<NewsPost> {
        const news = Array<NewsPost>();
        for (let index = 0; index < 4; index++) {
            let date = this.randomDate(new Date("1920-01-01"));
            news.push({
                id: index,
                title: this.randomString(5),
                text: this.randomString(100),
                uploadDate: toDateString(date),
                isSelected: false,
                tag: NewsPostTag.politycs
            });
        }
        return news;
    }

    public GetAll(): Array<NewsPost> {
        if(this.news){
            this.ExtractData();
        }
        return this.news;
    }

    public GetFirstOrDefault(predicate: Predicate<NewsPost>): NewsPost {
        return this.news.find(predicate) ?? new NewsPost();
    }

    public Add(item: NewsPost): void {
        item.id = this.news.length + 1;
        this.news.push(item);
    }

    public Update(item: NewsPost): void {
        this.news[item.id] = item;
    }

    public Delete(predicate: Predicate<NewsPost>) {
        this.news = this.news.filter(predicate);
    }

    public selectAll() {
        this.news = this.news.map(x => { x = new NewsPost(x); x.isSelected = true; return x; });
    }

    public isAnySelected(): boolean {
        return this.news.some(x => x.isSelected)
    }

    // Генерация рандомной даты 
    private randomDate(start: Date): Date {
        return new Date(start.getTime() + Math.random() * (new Date().getTime() - start.getTime()));
    }

    // Генерация рандомной строки нужной длины
    private randomString(length: number) {
        var result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ';
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    private ExtractData(){
        this.requestService.Get().subscribe(
            (data => this.news = data),
            (error) => { console.log(error) }
        )
    }
}