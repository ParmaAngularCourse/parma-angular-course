import { NewsPostTag } from "src/models/NewsPostTag";

export function GetStyleFromTag(tag: NewsPostTag): string {
    switch (tag) {
        case NewsPostTag.economics:
            return "slateblue"
        case NewsPostTag.politycs:
            return "tomato"
        case NewsPostTag.tourism:
            return "violet"
        case NewsPostTag.science:
            return "yellowgreen"
        case NewsPostTag.internet:
            return "seagreen"
        default:
            return "black"
    }
}