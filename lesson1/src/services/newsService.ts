import { NewsPost } from "src/models/NewsPost";
import { NewsPostTag } from "src/models/NewsPostTag";

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
                uploadDate: date,
                isSelected: false,
                tag: NewsPostTag.economics,
                uploadLocalDate: this.toDateString(date)
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
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    private toDateString(date: Date | undefined): string {
        return (date?.getFullYear().toString() + '-'
            + ("0" + (date?.getMonth() ?? 0 + 1)).slice(-2) + '-'
            + ("0" + (date?.getDate())).slice(-2))
            + 'T' + date?.toTimeString().slice(0, 5);
    }
}