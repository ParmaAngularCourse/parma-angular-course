import { Comment } from "./Comment";
import { NewsPostTag } from "./NewsPostTag";

export class NewsPost {
    public id: number;
    public isSelected: boolean;
    public title: string ;
    public text: string ;
    public uploadDate: Date;
    public uploadLocalDate : string;
    public tag: NewsPostTag ;

    constructor(element?: NewsPost) {
        this.id = element?.id ?? -1;
        this.isSelected = element?.isSelected ?? false;
        this.title = element?.title ?? "title";
        this.text = element?.text ?? "text";
        this.uploadDate = element?.uploadDate ?? new Date();
        this.tag = element?.tag ?? NewsPostTag.noTag;
        this.uploadLocalDate = "";
    }
}