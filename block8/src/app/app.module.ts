import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsBlockComponent } from './PageComponent/main-menu-page/news-list/news-block/news-block.component';
import { NewsListComponent } from './PageComponent/main-menu-page/news-list/news-list.component';
import { NewsEditorComponent } from './PageComponent/main-menu-page/news-editor/news-editor.component';
import { NewsContextMenuComponent } from './PageComponent/main-menu-page/news-list/news-context-menu/news-context-menu.component';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { GetFirstLetterPipe } from './pipes/get-first-letter.pipe';
import { GetNewsColorPipe } from './pipes/get-news-color.pipe';
import { NewsStylesDirective } from './Directives/news-styles.directive';
import { NewsTypeColorDirective } from './Directives/news-type-color.directive';
import { CheckAccessDirective } from './Directives/check-access.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationService } from './service/authorization.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NewsTypeComponent } from './PageComponent/main-menu-page/news-editor/news-type/news-type.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './PageComponent/page-not-found/page-not-found.component';
import { NewsTypeFilterComponent } from './PageComponent/main-menu-page/news-list/news-type-filter/news-type-filter.component';
import { GetNewsColorByTypeKeyPipe } from './pipes/get-news-color-by-type-key.pipe';
import { UserProfileComponent } from './PageComponent/main-menu-page/user-profile/user-profile.component';
import { LoginPageComponent } from './PageComponent/login-page/login-page.component';
import { MainMenuPageComponent } from './PageComponent/main-menu-page/main-menu-page.component';
import { AutoHideStatusMsgComponent } from './PageComponent/ShareComponent/auto-hide-status-msg/auto-hide-status-msg.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsBlockComponent,
    NewsListComponent,
    NewsEditorComponent,
    NewsContextMenuComponent,
    FirstLetterUppercasePipe,
    GetFirstLetterPipe,
    GetNewsColorPipe,
    NewsStylesDirective,
    NewsTypeColorDirective,
    CheckAccessDirective,
    NewsTypeComponent,
    PageNotFoundComponent,
    NewsTypeFilterComponent,
    GetNewsColorByTypeKeyPipe,
    UserProfileComponent,
    LoginPageComponent,
    MainMenuPageComponent,
    AutoHideStatusMsgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthorizationService,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  ngDoCheck(){
    console.log('root');
  }
}




