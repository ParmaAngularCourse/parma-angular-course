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