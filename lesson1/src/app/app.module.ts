import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { SingeCardNewsComponent } from './all-news/singe-card-news/singe-card-news.component';
import { NewsPostModalWindowComponent } from './news-post-modal-window/news-post-modal-window.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ModalCommonComponent } from './modal-common/modal-common.component';
import { CapitalLetterPipePipe } from './capital-letter-pipe.pipe';
import { PermissionDirectiveDirective } from './permission-directive.directive';
import { FirstLetterPipePipe } from './first-letter-pipe.pipe';
import { NewsTagStyleDirectiveDirective } from './news-tag-style-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    AllNewsComponent,
    SingeCardNewsComponent,
    NewsPostModalWindowComponent,
    ContextMenuComponent,
    ModalCommonComponent,
    CapitalLetterPipePipe,
    PermissionDirectiveDirective,
    FirstLetterPipePipe,
    NewsTagStyleDirectiveDirective
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
