import { Card } from "src/app/card/card";

export class NewsService {

    public GetNews(): Array<Card> {
        const news = Array<Card>();
        for (let i in [1, 2, 3, 4])
            news.push({
                text: "text",
                title: "title",
                uploadDate: this.randomDate(new Date("1920-01-01")),
                isSelected: false
            });
        return news;
    }
    randomDate(start: Date): Date {
        return new Date(start.getTime() + Math.random() * (new Date().getTime() - start.getTime()));
    }
}