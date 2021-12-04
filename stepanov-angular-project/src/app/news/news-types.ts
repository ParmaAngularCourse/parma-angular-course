import { INewsPart } from './i-news-part';

export class NewsPart implements INewsPart {
    public id: number | null;
    public date: Date;
    public title: string;
    public text: string;
    public isChecked: boolean;
    public type: NewsType;
    public localDateStr: string;

    constructor(id: number | null, date: Date, title: string, text: string, type: NewsType)
    {
        this.id = id;
        this.date = date;
        this.title = title;
        this.text = text;
        this.isChecked = false;
        this.type = type;
        this.localDateStr = this.createDateLocal();
    }

    public createDateLocal() : string {
        let newDate = new Date();
        let offsetMinutes = newDate.getTimezoneOffset();

        newDate.setFullYear(this.date.getFullYear());
        newDate.setMonth(this.date.getMonth());
        newDate.setDate(this.date.getDate());
        newDate.setHours(this.date.getHours());
        newDate.setMinutes(this.date.getMinutes() - offsetMinutes)
        newDate.setSeconds(this.date.getSeconds());

        return newDate.toISOString().slice(0, 19);
    }
}

export enum NewsType {
    Politics = 'Политика',
    Tourism = 'Туризм',
    Economics = 'Экономика',
    Science = 'Наука',
    Internet = 'Интернет'
}