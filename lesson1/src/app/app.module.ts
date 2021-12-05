import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsBlockComponent } from './news-block/news-block.component';
import { SinglePostComponent } from './news-block/single-post/single-post.component';
import { NewsModalWindowComponent } from './news-block/news-modal-window/news-modal-window.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsBlockComponent,
    SinglePostComponent,
    NewsModalWindowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
