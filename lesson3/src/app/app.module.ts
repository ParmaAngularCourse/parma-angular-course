import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { SinglePostComponent } from './all-posts/single-post/single-post.component';
import { SinglePostDetailComponent } from './all-posts/single-post-detail/single-post-detail.component';
import { HeaderPostDetailComponent } from './all-posts/header-post-detail/header-post-detail.component';
import { ContextMenuComponent } from './all-posts/context-menu/context-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AllPostsComponent,
    SinglePostComponent,
    SinglePostDetailComponent,
    HeaderPostDetailComponent,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
