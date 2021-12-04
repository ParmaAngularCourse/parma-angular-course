import { comment_single } from "./comment-single";

export class news_single {
    public id!: number;
    public isSelected: boolean = false;
    public title: string = "title";
    public text: string = "text";
    public uploadDate: Date = new Date();
    public comments: comment_single[] = [];

}