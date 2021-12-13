export type Report = {
  header: string,
  body: string,
  timestamp: string,
  isChecked: boolean,
  type: NewsType | null
}

export enum NewsType {
  Politics = "Политика",
  Tourism = "Туризм",
  Economy = "Экономика",
  Science = "Наука",
  Internet = "Интернет"
}
