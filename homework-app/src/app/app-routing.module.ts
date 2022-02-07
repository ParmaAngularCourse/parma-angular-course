import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthorizationComponent } from './authorization/authorization.component';
import { NewsEditformComponent } from './news-list/news-editform/news-editform.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ResolveDataService } from './resolve-data.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/news/all',
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: NewsPageComponent,
    resolve: {
      userData: ResolveDataService
    },
    children : [
      {
        path: 'news',
        redirectTo: '/news/all',
        pathMatch: 'full'
      },
      {
        path: ':type',
        component: NewsListComponent
      },
      {
        path: "**",
        redirectTo: '/news/all'
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
      userData: ResolveDataService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthorizationComponent
  },
  {
    path: 'add-news',
    component: NewsEditformComponent,
    outlet: 'editform'
  },
  {
    path: 'edit-news/:id',
    component: NewsEditformComponent,
    outlet: 'editform'
  },
  {
    path: "**",
    redirectTo: '/news/all'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
