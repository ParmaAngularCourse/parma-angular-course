import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news-list/news/news.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ContextMenuComponent } from './news-list/context-menu/context-menu.component';
import { FormsModule } from '@angular/forms';
import { NewsModalContentComponent } from './news-list/news-modal-content/news-modal-content.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsComponent,
    ModalComponent,
    ContextMenuComponent,
    NewsModalContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
