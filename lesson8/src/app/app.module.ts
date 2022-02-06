import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { ContextMenuComponent } from './all-posts/context-menu/context-menu.component';
import { HeaderPostDetailComponent } from './all-posts/header-post-detail/header-post-detail.component';
import { SinglePostDetailComponent } from './all-posts/single-post-detail/single-post-detail.component';
import { SinglePostComponent } from './all-posts/single-post/single-post.component';

import { AppComponent } from './app.component';
import { PostTitleCasePipePipe } from './shared/pipes/post-title-case-pipe.pipe';
import { PostTypePipePipe } from './shared/pipes/post-type-pipe.pipe';
import { PostTypeStylesDirective } from './shared/directives/post-type-styles.directive';
import { PostPermissionDeleteDirective } from './shared/directives/post-permission-delete.directive';
import { PostPermissionSaveDirective } from './shared/directives/post-permission-save.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterseptorService } from './services/http-interseptor.service';
import { PostTypeControlComponent } from './all-posts/post-type-control/post-type-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsPipe } from './shared/pipes/validation-errors.pipe';
import { PostTypeBtnStylePipe } from './shared/pipes/post-type-btn-style.pipe';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { MainMenuComponent } from './shared/components/main-menu/main-menu.component';
import { EditDialogComponent } from './all-posts/edit-dialog/edit-dialog.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromPost from './store/reducers/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/effects/post.effects';
import { effects } from './store/effects/index';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';

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
    PostTypeControlComponent,
    ValidationErrorsPipe,
    PostTypeBtnStylePipe,
    ProfileComponent,
    AuthComponent,
    MainMenuComponent,
    EditDialogComponent,
    PageNotFoundComponent,
    ConfirmDialogComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(effects),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterseptorService,
      multi: true,
    },
    { provide: CookieService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
