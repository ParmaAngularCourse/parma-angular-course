import { formatDate } from "@angular/common";
import '@angular/common/locales/global/ru';

export class News {
    public date:Date;
    public title:string = "";
    public body:string = "";    

    constructor(date: Date, title: string, body:string)
    {
        this.date = date;
        this.title = title;
        this.body = body;
    }
  }