import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { SinglePostComponent } from './news/single-post/single-post.component';
import { PostEditorComponent } from './news/post-editor/post-editor.component';
import { ContextMenuComponent } from './news/context-menu/context-menu.component';
import { NewsHeaderPipePipe } from './news/news-header-pipe.pipe';
import { NewsTypePipePipe } from './news/news-type-pipe.pipe';
import { NewsTypeStylesDirective } from './news/news-type-styles.directive';
import { UserRightsStrDirective } from './user-rights-str.directive';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    SinglePostComponent,
    PostEditorComponent,
    ContextMenuComponent,
    NewsHeaderPipePipe,
    NewsTypePipePipe,
    NewsTypeStylesDirective,
    UserRightsStrDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
