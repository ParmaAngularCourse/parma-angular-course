export class News {
    id:number;
    header: string;
    dateTime: string;
    isChecked: boolean;

    constructor(id:number, header: string, dateTime: string, isChecked: boolean) {
        this.id = id;
        this.header = header;
        this.dateTime = dateTime;
        this.isChecked = isChecked
    }
}