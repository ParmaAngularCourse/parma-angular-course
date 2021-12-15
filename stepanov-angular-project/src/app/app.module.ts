import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news/news-item/news-item.component';
import { NewsMakerComponent } from './news/news-maker/news-maker.component';
import { NewsContextMenuComponent } from './news/news-context-menu/news-context-menu.component';
import { NewsTitleCapitalLetterPipe } from './news/pipes/news-title-capital-letter.pipe';
import { NewsShowTypePipe } from './news/pipes/news-show-type.pipe';
import { NewsBackColorDirective } from './news/directives/news-back-color.directive';
import { NewsUserRoleRestrictionDirective } from './news/directives/news-user-role-restriction.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsItemComponent,
    NewsMakerComponent,
    NewsContextMenuComponent,
    NewsTitleCapitalLetterPipe,
    NewsShowTypePipe,
    NewsBackColorDirective,
    NewsUserRoleRestrictionDirective
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
