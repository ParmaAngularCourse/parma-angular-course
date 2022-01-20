export type NewsItem = {
  id: number,
  date: string,
  head: string,
  desc: string,
  tag: string,
  selected: boolean
}

export class NewsItemModel {

  private timeZoneMinutes : number = 0;
  public selected: boolean = false;

  constructor(public id: number,
              public date: Date,
              public head: string,
              public desc: string,
              public tag: string) {
    this.timeZoneMinutes = - (new Date()).getTimezoneOffset();
  }

  public get dateLocal() : string {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.date.getHours(),
      this.date.getMinutes() + this.timeZoneMinutes,
      this.date.getSeconds()
    ).toISOString().slice(0, 16);
  }

  public static create(item: NewsItem) : NewsItemModel {
    let model = new NewsItemModel(item.id, new Date(item.date), item.head, item.desc, item.tag);
    model.selected = item.selected;
    return model;
  }

  public fromModel() : NewsItem {
    return {
      id : this.id,
      date: this.date.toISOString(),
      head: this.head,
      desc: this.desc,
      tag: this.tag,
      selected: this.selected
    };
  }
}

export class NewsTag {
  constructor(public tag: string,
              public text: string,
              public color: string) {
  }
}
