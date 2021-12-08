import { comment } from "./comment-single";

export class NewsPost {
    public id!: number;
    public isSelected: boolean = false;
    public title: string = "title";
    public text: string = "text";
    public uploadDate: Date = new Date();
    public comments: comment[] = [];

}