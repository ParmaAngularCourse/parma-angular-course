import { Directive, Host, HostBinding, Input, } from '@angular/core';
import { getThemeKey, Theme } from './news-types';

@Directive({
  selector: '[appAdTheme]'
})
export class AdThemeDirective {
  @HostBinding('style.backgroundColor') color: string;
  @Input('appAdTheme') themeName: string = "";  

  constructor() {
    this.color = 'gray';
   }

  ngOnInit(){
    let themeKey = getThemeKey(this.themeName);
    themeKey = themeKey === undefined ? this.themeName : themeKey;

    switch (themeKey){
      case 'Politics': 
        this.color ='honeydew';
      break;
      case 'Tourism': 
        this.color ='khaki';
      break;
      case 'Economics': 
        this.color ='lightpink';
      break;
      case 'Science': 
        this.color ='mediumslateblue';
      break;
      case 'Internet': 
        this.color ='steelblue';
      break;
      default:
        this.color ='gray';
      break;
  }

  }
}

