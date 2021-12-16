import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { SingleNewsComponent } from './news/single-news/single-news.component';
import { EditDialogComponent } from './news/single-news/edit-dialog/edit-dialog.component';
import { PopupDialogComponent } from './news/popup-dialog/popup-dialog.component';
import { ContextMenuComponent } from './news/context-menu/context-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    SingleNewsComponent,
    EditDialogComponent,
    PopupDialogComponent,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
