import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NewsComponent } from './news-list/news/news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsEditformComponent } from './news-list/news-editform/news-editform.component';
import { HeaderEditformComponent } from './news-list/header-editform/header-editform.component';
import { ContextMenuComponent } from './news-list/context-menu/context-menu.component';
import { ShowByRolesDirective } from './show-by-roles.directive';
import { NewsTypeStylesDirective } from './news-type-styles.directive';
import { NewsTitlePipe } from './news-title.pipe';
import { NewsTypeBadgePipe } from './news-type-badge.pipe';
import { HttpInterceptorService } from './http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsListComponent,
    NewsEditformComponent,
    HeaderEditformComponent,
    ContextMenuComponent,
    ShowByRolesDirective,
    NewsTypeStylesDirective,
    NewsTitlePipe,
    NewsTypeBadgePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
