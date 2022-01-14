export type PostObj = {
    id: number,
    date:string,
    title:string,
    text: string,
    isSelected: boolean,
    postType: PostType | null
}

export enum PostType {
    politic = 'politic',
    tourism = 'tourism',
    economic = 'economic',
    science = 'science',
    internet = 'internet',
}
