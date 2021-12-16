export type NewsItem =  {
    id: number,
    news: NewsObj,
    checked: boolean, 
  //  allThemes: []
  }

export type NewsObj = {
  caption: string,
  text: string,
  date: Date
  theme: Theme
}

export enum Theme {
    Unknown = "¯\_(ツ)_/¯",
    Politics = "Политика",
    Tourism = "Туризм", 
    Economics = "Экономика",
    Science = "Наука",
    Internet = "Интернет"
} 



