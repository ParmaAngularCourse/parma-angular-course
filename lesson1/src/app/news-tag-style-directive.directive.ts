import { Directive, HostBinding, Input } from '@angular/core';
import { NewsPostTag } from 'src/models/NewsPostTag';
import { GetStyleFromTag } from 'src/services/tagStyleService';

@Directive({
  selector: '[appNewsTagStyleDirective]'
})
export class NewsTagStyleDirectiveDirective {

  @Input('appNewsTagStyleDirective') tagValue : any = NewsPostTag.noTag;
  @HostBinding('style.background-color') backColorStyle!: string;
  constructor() { }

  ngOnInit(){
    console.log(this.tagValue);
    this.backColorStyle =  GetStyleFromTag(this.tagValue);
  }
}
