import '@angular/common/locales/global/ru';
import { INewsData } from './INewsData';

export class News implements INewsData {
    public id:number = 0;
    public date:Date;
    public title:string = "";
    public body:string = "";    

    constructor(id:number, date: Date, title: string, body:string)
    {
        this.id = id;
        this.date = date;
        this.title = title;
        this.body = body;
    }
  }