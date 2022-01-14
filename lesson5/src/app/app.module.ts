import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { ContextMenuComponent } from './all-posts/context-menu/context-menu.component';
import { HeaderPostDetailComponent } from './all-posts/header-post-detail/header-post-detail.component';
import { SinglePostDetailComponent } from './all-posts/single-post-detail/single-post-detail.component';
import { SinglePostComponent } from './all-posts/single-post/single-post.component';

import { AppComponent } from './app.component';
import { PostTitleCasePipePipe } from './post-title-case-pipe.pipe';
import { PostTypePipePipe } from './post-type-pipe.pipe';
import { PostTypeSylesDirective } from './post-type-syles.directive';
import { PostPermissionDeleteDirective } from './post-permission-delete.directive';
import { PostPermissionSaveDirective } from './post-permission-save.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterseptorService } from './http-interseptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AllPostsComponent,
    SinglePostComponent,
    SinglePostDetailComponent,
    HeaderPostDetailComponent,
    ContextMenuComponent,
    PostTitleCasePipePipe,
    PostTypePipePipe,
    PostTypeSylesDirective,
    PostPermissionDeleteDirective,
    PostPermissionSaveDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterseptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
