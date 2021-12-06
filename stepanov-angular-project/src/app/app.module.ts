import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news/news-item/news-item.component';
import { NewsMakerComponent } from './news/news-maker/news-maker.component';
import { NewsContextMenuComponent } from './news/news-context-menu/news-context-menu.component';
import { NewsTitleCapitalLetterPipe } from './news/pipes/news-title-capital-letter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsItemComponent,
    NewsMakerComponent,
    NewsContextMenuComponent,
    NewsTitleCapitalLetterPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
