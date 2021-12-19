export type NewsItem =  {
    id: number,
    content: NewsContent,
    checked: boolean, 
  }

export type NewsContent = {
  caption: string,
  text: string,
  date: Date
  theme: Theme
}

export enum Theme {
    Unknown = "¯\\_(ツ)_/¯",
    Politics = "Политика",
    Tourism = "Туризм", 
    Economics = "Экономика",
    Science = "Наука",
    Internet = "Интернет"
} 

export function getThemeKey(value: string){
  return Object.entries(Theme).find(([key, val]) => val === value)?.[0];
}



