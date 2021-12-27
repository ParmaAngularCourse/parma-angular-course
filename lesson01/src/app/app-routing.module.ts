import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewsComponent} from "./news/news.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MainComponent} from "./main/main.component";
import {PersonComponent} from "./person/person.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./services/auth.guard";
import {TagsListService} from "./news/services/tags-list.service";
import {UnsaveWarningGuard} from "./services/unsave-warning.guard";
import {NewsItemModalReactiveComponent} from "./news/news-item-modal-reactive/news-item-modal-reactive.component";
import {NewsItemModalReactiveResolver} from "./news/news-item-modal-reactive/news-item-modal-reactive.resolver";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/news/all',
    pathMatch: 'full'
  },
  {
    path: 'main',
    resolve: {
      TagsList: TagsListService
    },
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'news/all',
        pathMatch: 'full'
      },
      {
        path: 'news',
        redirectTo: 'news/all',
        pathMatch: 'full'
      },
      {
        path: 'news/:tagsId',
        component: NewsComponent
      }
    ]
  },
  {
    path: 'person',
    canActivate: [AuthGuard],
    canDeactivate: [UnsaveWarningGuard],
    component: PersonComponent
  },
  {
    path: 'add',
    component: NewsItemModalReactiveComponent,
    outlet: 'modal'
  },
  {
    path: 'edit/:id',
    component: NewsItemModalReactiveComponent,
    outlet: 'modal',
    resolve: {
      newsItem: NewsItemModalReactiveResolver
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
