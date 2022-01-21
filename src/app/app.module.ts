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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterseptorService } from './http-interseptor.service';
import { CrazyRadioComponent } from './crazy-radio/crazy-radio.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { LoginComponent } from './login/login.component';
import { CustomRadioComponent } from './custom-radio/custom-radio.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { SnackbarComponent } from './snackbar/snackbar.component';

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
    TooltipDirective,
    CrazyRadioComponent,
    ProfileComponent,
    EditComponentComponent,
    LoginComponent,
    CustomRadioComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterseptorService,
    multi: true
  }], 
  bootstrap: [AppComponent]
})
export class AppModule { }
