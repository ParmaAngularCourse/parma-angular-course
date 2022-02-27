import { Comment } from "./Comment";
import { NewsPostTag } from "./NewsPostTag";
import { toDateString } from "src/utils/DateUtils";
export class NewsPost {
    public id: number;
    public isSelected: boolean;
    public title: string  | null;
    public text: string | null ;
    public uploadDate: string | null;
    public tag: NewsPostTag ;

    constructor(element?: NewsPost | null) {
        this.id = element?.id ?? -1;
        this.isSelected = element?.isSelected ?? false;
        this.title = element?.title ?? null;
        this.text = element?.text ?? null;
        this.uploadDate = element?.uploadDate ?? null;
        this.tag = element?.tag ?? NewsPostTag.noTag;
    }
}