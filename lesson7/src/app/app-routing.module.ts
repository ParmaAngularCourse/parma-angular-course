import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { EditDialogComponent } from './all-posts/edit-dialog/edit-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { EditPostGuard } from './edit-post.guard';
import { EditProfileGuard } from './edit-profile.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    component: AllPostsComponent,
    children: [
      {
        path: 'edit/:id',
        canDeactivate: [EditPostGuard],
        component: EditDialogComponent,
      },
      {
        path: 'add',
        canDeactivate: [EditPostGuard],
        component: EditDialogComponent,
      },
    ],
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    canDeactivate: [EditProfileGuard],
    component: ProfileComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
