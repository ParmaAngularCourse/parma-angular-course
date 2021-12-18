import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { SingeCardNewsComponent } from './all-news/singe-card-news/singe-card-news.component';
import { NewsPostModalWindowComponent } from './news-post-modal-window/news-post-modal-window.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ModalCommonComponent } from './modal-common/modal-common.component';

@NgModule({
  declarations: [
    AppComponent,
    AllNewsComponent,
    SingeCardNewsComponent,
    NewsPostModalWindowComponent,
    ContextMenuComponent,
    ModalCommonComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
