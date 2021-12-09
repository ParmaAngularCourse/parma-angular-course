import { Injectable } from '@angular/core';

export class Permission {
  constructor(public action: string,
              public enable: boolean) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private _permissions: Permission[] = [
    new Permission("deleteItem", false),
    new Permission("edit", true)
  ];

  private _authToken = {
    "token": "0YLRiyDQt9Cw0YfQtdC8INC/0LDRgNGB0LjRiNGMINGH0YPQttC+0Lkg0LrQvtC0Pw==",
    "expireIn": 100000,
    "refreshToken": "0JrRgtC+INGD0LHQuNC7INCb0L7RgNGDINCf0LDQu9C80LXRgD8=",
    "sign": "0JHRgyE="
  };

  constructor() { }

  public getPermissions() {
    return this._permissions;
  }

  public getAuthToken() : string {
    return JSON.stringify(this._authToken);
  }
}
