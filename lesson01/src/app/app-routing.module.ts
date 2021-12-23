import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewsComponent} from "./news/news.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MainComponent} from "./main/main.component";
import {PersonComponent} from "./person/person.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/news/',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'news/',
        pathMatch: 'full'
      },
      {
        path: 'news',
        redirectTo: 'news/',
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
    component: PersonComponent
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
