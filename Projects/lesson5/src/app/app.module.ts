import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { SinglePostComponent } from './all-posts/single-post/single-post.component';
import { CommentListComponent } from './all-posts/single-post/comment-list/comment-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostsService } from './posts.service';
import { HttpInterceptorService } from './http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AllPostsComponent,
    SinglePostComponent,
    CommentListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'ru-RU'
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
