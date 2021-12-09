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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
