import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news-list/news/news.component';
import { AddEditNewsModalComponent } from './news-list/add-edit-news-modal/add-edit-news-modal.component';
import { ContextMenuComponent } from './news-list/context-menu/context-menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsComponent,
    AddEditNewsModalComponent,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
