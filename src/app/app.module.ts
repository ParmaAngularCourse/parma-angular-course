import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './news/report/report.component';
import { EditReportFormComponent } from './news/edit-report-form/edit-report-form.component';
import { ModalComponent } from './modal/modal.component';
import { NewsTypeStyleDirective } from './news-type-style.directive';
import { RightsDirective } from './rights.directive';
import { UpperCaseNamePipePipe } from './upper-case-name-pipe.pipe';
import { NewsTypePipePipe } from './news-type-pipe.pipe';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ReportComponent,
    EditReportFormComponent,
    ModalComponent,
    NewsTypeStyleDirective,
    RightsDirective,
    UpperCaseNamePipePipe,
    NewsTypePipePipe,
    TooltipDirective
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
