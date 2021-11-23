import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './news/report/report.component';
import { EditReportFormComponent } from './news/edit-report-form/edit-report-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ReportComponent,
    EditReportFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
