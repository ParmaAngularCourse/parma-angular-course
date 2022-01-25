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
import { AdThemeDirective } from './news/ad-theme.directive';
import { SdRightsToChangeDirective } from './news/sd-rights-to-change.directive';
import { ThemePipe } from './news/theme.pipe';
import { CaptionPipe } from './news/caption.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    SingleNewsComponent,
    EditDialogComponent,
    PopupDialogComponent,
    ContextMenuComponent,
    AdThemeDirective,
    SdRightsToChangeDirective,
    ThemePipe,
    CaptionPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
