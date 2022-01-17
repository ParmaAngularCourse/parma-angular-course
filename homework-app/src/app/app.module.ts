import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { NewsTypeComponent } from './news-list/news-type/news-type.component';

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
    NewsTypeBadgePipe,
    NewsTypeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
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
