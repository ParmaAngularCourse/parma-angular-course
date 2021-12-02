export type News = {
    id: number;
    date: Date;
    title: string;
    text: string;
    type: NewsType;
    selected: boolean;
}

export enum NewsType {
    Politics = "Политика",
    Tourism = "Туризм",
    Economics = "Экономика",
    Science = "Наука",
    Internet = "Интернет"
}
