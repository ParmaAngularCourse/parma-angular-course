import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { SingleNewsComponent } from './news/single-news/single-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    SingleNewsComponent,
    EditNewsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
