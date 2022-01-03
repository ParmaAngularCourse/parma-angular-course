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
import { PostTypeStylesDirective } from './post-type-styles.directive';
import { PostPermissionDeleteDirective } from './post-permission-delete.directive';
import { PostPermissionSaveDirective } from './post-permission-save.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterseptorService } from './http-interseptor.service';
import { PostTypeControlComponent } from './all-posts/post-type-control/post-type-control.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    PostTypeStylesDirective,
    PostPermissionDeleteDirective,
    PostPermissionSaveDirective,
    PostTypeControlComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
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
