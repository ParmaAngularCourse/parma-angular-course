export type Report = {
  header: string,
  body: string,
  timestamp: string,
  isChecked: boolean,
  type: NewsType | null,
  rowNum?: number
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
