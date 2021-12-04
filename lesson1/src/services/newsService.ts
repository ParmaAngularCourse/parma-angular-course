import { Card } from "src/app/card/card";

export class NewsService {

    // Мок сервиса, отдающего новости
    public GetNews(): Array<Card> {
        const news = Array<Card>();
        for (let i in [1, 2, 3, 4])
            news.push({
                title: `Title: ${this.randomString(5)}`,
                text: `Text: ${this.randomString(250)}`,
                uploadDate: this.randomDate(new Date("1920-01-01")),
                isSelected: false
            });
        return news;
    }

    // Генерация рандомной даты 
    randomDate(start: Date): Date {
        return new Date(start.getTime() + Math.random() * (new Date().getTime() - start.getTime()));
    }

    // Генерация рандомной строки нужной длины
     randomString(length:number) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
}