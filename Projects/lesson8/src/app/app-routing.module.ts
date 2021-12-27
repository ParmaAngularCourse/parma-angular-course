import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostViewComponent } from './components/post-view/post-view.component';
import { AllPostsComponent } from './containers/all-posts.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/allposts',
    pathMatch: 'full' 
  },
  {
    path: 'allposts',
    component: AllPostsComponent
  },
  {
    path: 'post/:postId',
    component: PostViewComponent
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
