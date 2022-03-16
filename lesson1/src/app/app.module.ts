import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { SingeCardNewsComponent } from './all-news/singe-card-news/singe-card-news.component';
import { NewsPostModalWindowComponent } from './news-post-modal-window/news-post-modal-window.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ModalCommonComponent } from './modal-common/modal-common.component';
import { CapitalLetterPipePipe } from './capital-letter-pipe.pipe';
import { PermissionDirectiveDirective } from './permission-directive.directive';
import { FirstLetterPipePipe } from './first-letter-pipe.pipe';
import { NewsTagStyleDirectiveDirective } from './news-tag-style-directive.directive';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
//import { AuthInterseptorService } from './auth-interseptor.service';
import { NewsRadioControlComponent } from './news-radio-control/news-radio-control.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HeaderPageSwitcherComponent } from './header-page-switcher/header-page-switcher.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { TagSwitcherComponent } from './tag-switcher/tag-switcher.component';
import { MainComponent } from './main/main.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    AllNewsComponent,
    SingeCardNewsComponent,
    NewsPostModalWindowComponent,
    ContextMenuComponent,
    ModalCommonComponent,
    CapitalLetterPipePipe,
    PermissionDirectiveDirective,
    FirstLetterPipePipe,
    NewsTagStyleDirectiveDirective,
    NewsRadioControlComponent,
    ProfileComponent,
    HeaderPageSwitcherComponent,
    LoginComponent,
    TagSwitcherComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [/*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterseptorService,
      multi: true,
    },*/
    CookieService 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
