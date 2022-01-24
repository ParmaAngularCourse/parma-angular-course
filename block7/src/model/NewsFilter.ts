import { TypeNews } from "./TypeNews";

export class NewsFilter {
    public searchTextFilter:string = "";
    public newsTypeFilter:TypeNews = TypeNews.Type0_None;

    constructor(searchTextFilter:string, typeFilter:TypeNews = TypeNews.Type0_None)
    {
        this.searchTextFilter = searchTextFilter;
        this.newsTypeFilter = typeFilter;
    }
  }