export enum subjectType{
  politics,
  tourism,
  economy,
  science,
  internet
}
export type  newsType = {
    id: number,
    dt: Date,
    title: string;
    text: string,
    subject: subjectType,
    checked: boolean
  }
  