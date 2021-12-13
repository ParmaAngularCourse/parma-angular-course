export type News = {
   id: number,
   title: string,
   dateTime: string,
   text: string,
   newsType: NewsType 
}

export type Position = {
   top: number,
   left: number
}

export type NewsType = {
   id: number,
   text: string,
   color: string
}

export const NewsTypeObjectEnum = {
   Politics: { id: 1, text: "Политика", color: "green" },
   Tourism: { id: 2, text: "Туризм", color: "purple" },
   Economics: { id: 3, text: "Экономика", color: "orange" },
   Science: { id: 4, text: "Наука", color: "blue" },
   Internet: { id: 5, text: "Интернет", color: "grey" },
} as const

