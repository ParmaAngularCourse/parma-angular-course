import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsBlockComponent } from './news-list/news-block/news-block.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsEditorComponent } from './news-editor/news-editor.component';
import { NewsContextMenuComponent } from './news-context-menu/news-context-menu.component';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { GetFirstLetterPipe } from './pipes/get-first-letter.pipe';
import { GetNewsColorPipe } from './pipes/get-news-color.pipe';
import { NewsStylesDirective } from './Directives/news-styles.directive';
import { NewsTypeColorDirective } from './Directives/news-type-color.directive';
import { CheckAccessDirective } from './Directives/check-access.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationService } from './service/authorization.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsBlockComponent,
    NewsListComponent,
    NewsEditorComponent,
    NewsContextMenuComponent,
    FirstLetterUppercasePipe,
    GetFirstLetterPipe,
    GetNewsColorPipe,
    NewsStylesDirective,
    NewsTypeColorDirective,
    CheckAccessDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthorizationService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  ngDoCheck(){
    console.log('root');
  }
}




