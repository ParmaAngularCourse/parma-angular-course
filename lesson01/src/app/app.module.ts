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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./news/services/auth-interceptor.service";
import { ModalWindowComponent } from './controls/modal-window/modal-window.component';
import { NewsItemModalReactiveComponent } from './news/news-item-modal-reactive/news-item-modal-reactive.component';
import {ReactiveFormsModule} from "@angular/forms";
import { TagsSelectorComponent } from './news/tags-selector/tags-selector.component';
import {AppRoutingModule} from "./app-routing.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';

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
    PermissionDirective,
    ModalWindowComponent,
    NewsItemModalReactiveComponent,
    TagsSelectorComponent,
    PageNotFoundComponent,
    MainComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
