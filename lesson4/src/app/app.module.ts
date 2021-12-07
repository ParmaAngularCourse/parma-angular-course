import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { ContextMenuComponent } from './all-posts/context-menu/context-menu.component';
import { HeaderPostDetailComponent } from './all-posts/header-post-detail/header-post-detail.component';
import { SinglePostDetailComponent } from './all-posts/single-post-detail/single-post-detail.component';
import { SinglePostComponent } from './all-posts/single-post/single-post.component';

import { AppComponent } from './app.component';

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
