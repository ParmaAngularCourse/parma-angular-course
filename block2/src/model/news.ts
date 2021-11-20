import { DatePipe, formatDate } from "@angular/common";
import '@angular/common/locales/global/ru';

export class News {
    public date:string;
    public title:string = "";
    public body:string = "";    

    constructor(date: Date, title: string, body:string)
    {
        this.date = formatDate(date,'mediumDate','ru');
        this.title = title;
        this.body = body;
    }
  }