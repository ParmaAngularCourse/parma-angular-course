import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from '../news/news.component';
import { ProfileComponent } from '../profile/profile.component';
import { LoginComponent } from '../login/login.component';
import { PostEditorComponent } from '../news/post-editor/post-editor.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
{
  path:'',
  redirectTo: '/news',
  pathMatch: 'full'
},
{
  path: 'news',
  component: NewsComponent,
  canActivate: [AuthGuard]
},
{
  path: 'news/:newstypeid',
  component: NewsComponent,
  canActivate: [AuthGuard]
  /*children:[
    {
      path: 'main3',
      component: NewsComponent
    }
  ]*/
},
{
  path: 'modal',
  component: PostEditorComponent,
  outlet: 'modalPostEditor'
},
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard]
},
{
  path: 'login',
  component: LoginComponent
}
];

@NgModule({
  declarations: [],
  imports: [
    //RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
