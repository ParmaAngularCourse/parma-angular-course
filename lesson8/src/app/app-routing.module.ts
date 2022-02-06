import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { EditDialogComponent } from './all-posts/edit-dialog/edit-dialog.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { EditPostGuard } from './shared/guards/edit-post.guard';
import { EditProfileGuard } from './shared/guards/edit-profile.guard';

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
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
