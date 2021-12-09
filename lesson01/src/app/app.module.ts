import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news/news-item/news-item.component';
import { NewsItemModalComponent } from './news/news-item-modal/news-item-modal.component';
import { ContextMenuComponent } from './news/context-menu/context-menu.component';
import { CapitalizePipe } from './news/capitalize.pipe';
import { MinitagsPipe } from './news/minitags.pipe';
import { ColorizedLabelDirective } from './news/colorized-label.directive';
import { PermissionDirective } from './news/permission.directive';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsItemComponent,
    NewsItemModalComponent,
    ContextMenuComponent,
    CapitalizePipe,
    MinitagsPipe,
    ColorizedLabelDirective,
    PermissionDirective
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
