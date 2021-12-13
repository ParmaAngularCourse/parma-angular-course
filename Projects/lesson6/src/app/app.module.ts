import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TemplateFormControlComponent } from './template-form-control/template-form-control.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TemplateValidateDirective } from './template-validate.directive';
import { OneRecordComponent } from './one-record/one-record.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateFormControlComponent,
    TemplateFormComponent,
    TemplateValidateDirective,
    OneRecordComponent,
    RxjsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [RxjsComponent]
})
export class AppModule { }
