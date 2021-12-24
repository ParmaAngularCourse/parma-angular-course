import { NewsPost } from "src/models/NewsPost";
import { NewsPostTag } from "src/models/NewsPostTag";
import { toDateString } from "src/utils/DateUtils";

export class NewsService {

    // Мок сервиса, отдающего новости
    public GetNews(): Array<NewsPost> {
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

    // Генерация рандомной даты 
    randomDate(start: Date): Date {
        return new Date(start.getTime() + Math.random() * (new Date().getTime() - start.getTime()));
    }

    // Генерация рандомной строки нужной длины
    randomString(length: number) {
        var result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ';
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
}