import { INewsPart } from './i-news-part';

export class NewsPart implements INewsPart {
    public id: number | null;
    public date: Date;
    public title: string;
    public text: string;
    public isChecked: boolean;

    constructor(id: number, date: Date, title: string, text: string)
    {
        this.id = id;
        this.date = date;
        this.title = title;
        this.text = text;
        this.isChecked = false;
    }
}