import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news-list/news/news.component';
import { AddEditNewsModalComponent } from './news-list/add-edit-news-modal/add-edit-news-modal.component';
import { EditNewsModalContentComponent } from './edit-news-modal-content/edit-news-modal-content.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsComponent,
    AddEditNewsModalComponent,
    EditNewsModalContentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
