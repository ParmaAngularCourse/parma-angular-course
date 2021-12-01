import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news/news-item/news-item.component';
import { NewsItemModalComponent } from './news/news-item-modal/news-item-modal.component';
import { ContextMenuComponent } from './news/context-menu/context-menu.component';
import { CapitalizePipe } from './news/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsItemComponent,
    NewsItemModalComponent,
    ContextMenuComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
