import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './shared/components/modal/modal.component';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { AllPostsComponent } from './containers/all-posts.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { ContentModalComponent } from './components/content-modal/content-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { CustomRouterStateSerializer, effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DefaultRouterStateSerializer, MinimalRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    AllPostsComponent,
    SinglePostComponent,
    CommentListComponent,
    ModalComponent,
    ContentModalComponent,
    SnackbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router', serializer: CustomRouterStateSerializer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
