import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { SinglePostComponent } from './all-posts/single-post/single-post.component';
import { SinglePostDetailComponent } from './all-posts/single-post-detail/single-post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AllPostsComponent,
    SinglePostComponent,
    SinglePostDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
