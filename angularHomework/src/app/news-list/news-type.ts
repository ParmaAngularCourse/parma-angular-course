export type News = {
   id: number,
   title: string,
   dateTime: string,
   text: string,
   isChecked: boolean,
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

