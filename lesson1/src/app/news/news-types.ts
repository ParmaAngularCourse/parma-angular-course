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

export function getThemeKey (value: string){
  return  (Object.entries(Theme).find(([key, val]) => val === value)?.[0]);
}

export function getThemeByKey(keyOrValue: string | undefined) : Theme {  
  switch (keyOrValue) {
    case 'Politics':
      return Theme.Politics;     
    case 'Tourism':
      return Theme.Tourism;
    case 'Economics':
      return Theme.Economics;  
    case 'Science':
      return Theme.Science;
    case 'Internet':
      return Theme.Internet;
    default:
      return Theme.Unknown;    
  }
}

export function getTheme(keyOrValue :string) : Theme{
  return getThemeByKey(getThemeKey(keyOrValue));
}