export type NewsItem =  {
    id: number,
    news: NewsObj
    checked: boolean 
  }

export type NewsObj = {
  caption: string,
  text: string,
  date: Date
}

enum Theme {
    Politics = "Политика",
    Tourism = "Туризм", 
    Economics = "Экономика",
    Science = "Наука",
    Internet = "Интернет"
} 
