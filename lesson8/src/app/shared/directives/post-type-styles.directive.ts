import { Directive, HostBinding, Input } from '@angular/core';
import { PostType } from '../../all-posts/post-types';

@Directive({
  selector: '[appPostTypeStyles]',
})
export class PostTypeStylesDirective {
  @HostBinding('style.background-color') backgroundColor: string = 'brown';
  @HostBinding('style.color') color: string = 'white';
  //@HostBinding('style.border') border: string = "0px";
  @HostBinding('style.border-radius') borderRedius: string = '4px';
  @HostBinding('style.padding') padding: string = '1px 10px';
  @HostBinding('style.margin') margin: string = '3px;';
  @Input('appPostTypeStyles') postType!: PostType | string | null;

  constructor() {}

  ngOnInit() {
    this.backgroundColor = this.getColorByPostType(this.postType);
  }

  getColorByPostType(postType: PostType | string | null): string {
    switch (postType as PostType) {
      case PostType.politic:
        return 'green';
      case PostType.economic:
        return 'coral';
      case PostType.internet:
        return 'gray';
      case PostType.science:
        return 'royalblue';
      case PostType.tourism:
        return 'darkcyan';
      default:
        return 'brown';
    }
  }
}
