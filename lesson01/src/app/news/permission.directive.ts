import {ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import { Permission } from '../types';
import {takeUntil} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {PersonInfoService} from "../services/person-info.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[appPermission], appPermission'
})
export class PermissionDirective implements OnInit, OnDestroy {
  permissions!: Permission[];
  private _ngUnsubscribe$: Subject<number>;
  private _action: string = "";

  // @Input() set appPermission(perms: Permission[]) {
  //   this.permissions = perms;
  // }
  // @Input() appPermissionAction!: string;

  @Input() set appPermission(action: string) {
    this._action = action;
  }

  constructor(
    private _personInfoService : PersonInfoService,
    private _tpl: TemplateRef<any>,
    private _vc: ViewContainerRef,
    private _cd: ChangeDetectorRef) {
    this._ngUnsubscribe$ = new Subject();
  }

  ngOnInit(){
    this._personInfoService.getPermissions()
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next: (data) => {
          this.permissions = data;
          let item = this.permissions.find(p => p.action == this._action && p.enable);
          if(item != undefined){
            this._vc.createEmbeddedView(this._tpl);
          } else {
            this._vc.clear();
          }
          this._cd.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.status + " " + error.message)
        }
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
