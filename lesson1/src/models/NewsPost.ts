import { Comment } from "./Comment";
import { NewsPostTag } from "./NewsPostTag";
import { toDateString } from "src/utils/DateUtils";
export class NewsPost {
    public id: number;
    public isSelected: boolean;
    public title: string ;
    public text: string ;
    public uploadDate: string;
    public tag: NewsPostTag ;

    constructor(element?: NewsPost | null) {
        this.id = element?.id ?? -1;
        this.isSelected = element?.isSelected ?? false;
        this.title = element?.title ?? "title";
        this.text = element?.text ?? "text";
        this.uploadDate = element?.uploadDate ?? toDateString(new Date());
        this.tag = element?.tag ?? NewsPostTag.noTag;
    }
}