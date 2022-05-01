import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news-list/news/news.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ContextMenuComponent } from './shared/context-menu/context-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsModalContentComponent } from './news-list/news-modal-content/news-modal-content.component';
import { FirstCapitalLetterPipe } from './pipes/first-capital-letter.pipe';
import { FirstLetterLowerPipe } from './pipes/first-letter-lower.pipe';
import { NewsTypeStyleDirective } from './news-list/directives/news-type-style.directive';
import { UserPermissionsDirective } from './directives/user-permissions.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { NewsTypeInputComponent } from './news-list/news-modal-content/news-type-input/news-type-input.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterTypeComponent } from './filter-type/filter-type.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AuthComponent } from './auth/auth.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { NewsModalComponent } from './news-list/news-modal/news-modal.component';

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
    UserPermissionsDirective,
    NewsTypeInputComponent,
    FilterTypeComponent,
    UserInfoComponent,
    AuthComponent,
    PageHeaderComponent,
    NewsModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
