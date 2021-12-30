import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news-list/news/news.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ContextMenuComponent } from './shared/context-menu/context-menu.component';
import { FormsModule } from '@angular/forms';
import { NewsModalContentComponent } from './news-list/news-modal-content/news-modal-content.component';
import { FirstCapitalLetterPipe } from './pipes/first-capital-letter.pipe';
import { FirstLetterLowerPipe } from './pipes/first-letter-lower.pipe';
import { NewsTypeStyleDirective } from './news-list/directives/news-type-style.directive';
import { UserPermissionsDirective } from './directives/user-permissions.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsComponent,
    ModalComponent,
    ContextMenuComponent,
    NewsModalContentComponent,
    FirstCapitalLetterPipe,
    FirstLetterLowerPipe,
    NewsTypeStyleDirective,
    UserPermissionsDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
