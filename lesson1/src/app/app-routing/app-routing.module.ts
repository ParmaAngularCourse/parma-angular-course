import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllNewsComponent } from '../all-news/all-news.component';
import { ProfileComponent } from '../profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: AllNewsComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
