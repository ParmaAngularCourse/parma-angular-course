import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonInfo, PersonInfoService} from "./service/person-info.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonComponent implements OnInit, OnDestroy {

  private _ngUnsubscribe$: Subject<number>;
  personFormGroup! : FormGroup;
  personInfo! : PersonInfo;

  get personName() : FormControl {
    return this.personFormGroup.get('personName') as FormControl;
  }
  get personFamily() : FormControl {
    return this.personFormGroup.get('personFamily') as FormControl;
  }
  get personEmail() : FormControl {
    return this.personFormGroup.get('personEmail') as FormControl;
  }

  constructor(private _personInfoService : PersonInfoService,
              private _cd: ChangeDetectorRef) {
    this._ngUnsubscribe$ = new Subject<number>();
  }

  ngOnInit(): void {

    this._personInfoService.getPersonInfo()
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(
        (data) => {
          this.personInfo = data;

          this.personFormGroup = new FormGroup({
            personName : new FormControl(this.personInfo.name, [Validators.required]),
            personFamily : new FormControl(this.personInfo.family, [Validators.required]),
            personEmail : new FormControl(this.personInfo.email, [Validators.required, Validators.email])
          })

          this._cd.detectChanges();
        },
        (error: HttpErrorResponse) => {
          console.log(error.status + " " + error.message)
        });
  }

  onSave() : void {
    console.log('onSave');
  }

  onCancel() : void {
    console.log('onCancel');
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
