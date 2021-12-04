import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { SingeCardNewsComponent } from './all-news/singe-card-news/singe-card-news.component';
import { NewsPostModalWindowComponent } from './news-post-modal-window/news-post-modal-window.component';

@NgModule({
  declarations: [
    AppComponent,
    AllNewsComponent,
    SingeCardNewsComponent,
    NewsPostModalWindowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
