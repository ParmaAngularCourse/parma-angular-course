export class NewsItemModel {

  private timeZoneMinutes : number = 0;

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
}

export class NewsTag {
  constructor(public tag: string,
              public text: string,
              public color: string) {
  }
}

export class Permission {
  constructor(public action: string,
              public enable: boolean) {
  }
}

export const Permissions: Permission[] = [
  new Permission("deleteItem", true),
  new Permission("edit", true)
];
