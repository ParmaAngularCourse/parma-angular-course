import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { SinglePostComponent } from './news/single-post/single-post.component';
import { PostEditorComponent } from './news/post-editor/post-editor.component';
import { ContextMenuComponent } from './news/context-menu/context-menu.component';
import { NewsHeaderPipePipe } from './news/news-header-pipe.pipe';
import { NewsTypePipePipe } from './news/news-type-pipe.pipe';
import { NewsTypeStylesDirective } from './news/news-type-styles.directive';
import { UserRightsStrDirective } from './user-rights-str.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsTypeComponent } from './news/news-type/news-type.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { OutletModalEditorComponent } from './outlet-modal-editor/outlet-modal-editor.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';
import { effects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    SinglePostComponent,
    PostEditorComponent,
    ContextMenuComponent,
    NewsHeaderPipePipe,
    NewsTypePipePipe,
    NewsTypeStylesDirective,
    UserRightsStrDirective,
    NewsTypeComponent,
    ProfileComponent,
    LoginComponent,
    OutletModalEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
