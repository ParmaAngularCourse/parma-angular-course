export class News {
    header: string;
    dateTime: string;
    isChecked: boolean;

    constructor(header: string, dateTime: string, isChecked: boolean) {

        this.header = header;
        this.dateTime = dateTime;
        this.isChecked = isChecked
    }
}