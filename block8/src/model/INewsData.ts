import { TypeNews } from "./TypeNews";

export interface INewsData {
    id:number;
    date:Date;
    title:string;
    body:string;
    type:TypeNews;
  }