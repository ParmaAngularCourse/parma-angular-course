import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
