import { Validator } from "@angular/forms";
import { Observable } from 'rxjs';

export type Report = {
  header: string,
  body: string,
  timestamp: string,
  isChecked: boolean,
  type: NewsType | null,
  colNum?: number
}

export enum NewsType {
  Politics = "Политика",
  Tourism = "Туризм",
  Economy = "Экономика",
  Science = "Наука",
  Internet = "Интернет"
}

export const newsTypeColors = new Map<string, string | "black">([
  [NewsType.Economy, 'purple'],
  [NewsType.Politics, 'orange'],
  [NewsType.Internet, 'deeppink'],
  [NewsType.Tourism, 'plum'],
  [NewsType.Science, 'hotpink']
]);

export type Template = {
  name: string,
  header?: string,
  type?: string,
  enum?: any,
  colors?: any,
  validators?: Validator[]
}

export type User = {
  name: string,
  surname: string,
  email: string
}

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}
