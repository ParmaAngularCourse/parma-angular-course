import '@angular/common/locales/global/ru';
import { TypeNews } from './TypeNews';

export class News {
    public id:number = 0;
    public date:Date;
    public title:string = "";
    public body:string = "";
    public type:TypeNews = TypeNews.Type0_None    

    constructor(id:number, date: Date, title: string, body:string, type:TypeNews = TypeNews.Type0_None)
    {
        this.id = id;
        this.date = date;
        this.title = title;
        this.body = body;
        this.type = type;
    }
  }