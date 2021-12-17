import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { SinglePostComponent } from './news/single-post/single-post.component';
import { PostEditorComponent } from './news/post-editor/post-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    SinglePostComponent,
    PostEditorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
