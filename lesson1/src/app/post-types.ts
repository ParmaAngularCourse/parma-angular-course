export type NewsBlock = {
    id: number;
    date: Date;
    title: string;
    text: string;
    checked: boolean;
    newsType: NewsType;
}

export type NewsType = { 
    id: number;
    name: string;
}