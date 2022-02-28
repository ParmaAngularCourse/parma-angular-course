import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllNewsComponent } from '../all-news/all-news.component';
import { ProfileComponent } from '../profile/profile.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../auth-guard.guard';
import { MainComponent } from '../main/main.component';
import { ClosePageGuard } from '../close-page.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  { path: 'auth', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        canDeactivate: [ClosePageGuard],
      },
      {
        path: 'news',
        component: AllNewsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}