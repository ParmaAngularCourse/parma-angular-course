import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsBlockComponent } from './news-list/news-block/news-block.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsEditorComponent } from './news-editor/news-editor.component';
import { NewsContextMenuComponent } from './news-context-menu/news-context-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsBlockComponent,
    NewsListComponent,
    NewsEditorComponent,
    NewsContextMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  ngDoCheck(){
    console.log('root');
  }
}




