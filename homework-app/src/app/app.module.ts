import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NewsComponent } from './news-list/news/news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsEditformComponent } from './news-list/news-editform/news-editform.component';
import { HeaderEditformComponent } from './news-list/header-editform/header-editform.component';
import { ContextMenuComponent } from './news-list/context-menu/context-menu.component';
import { ShowByRolesDirective } from './show-by-roles.directive';
import { NewsTypeStylesDirective } from './news-type-styles.directive';
import { NewsTitlePipe } from './news-title.pipe';
import { NewsTypeBadgePipe } from './news-type-badge.pipe';
import { HttpInterceptorService } from './http-interceptor.service';
import { NewsTypeComponent } from './news-list/news-type/news-type.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NewsTypeFiltersComponent } from './news-type-filters/news-type-filters.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsListComponent,
    NewsEditformComponent,
    HeaderEditformComponent,
    ContextMenuComponent,
    ShowByRolesDirective,
    NewsTypeStylesDirective,
    NewsTitlePipe,
    NewsTypeBadgePipe,
    NewsTypeComponent,
    ProfileComponent,
    NewsTypeFiltersComponent,
    NewsPageComponent,
    AuthorizationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
