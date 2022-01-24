import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './PageComponent/login-page/login-page.component';
import { MainMenuPageComponent } from './PageComponent/main-menu-page/main-menu-page.component';
import { NewsEditorComponent } from './PageComponent/main-menu-page/news-editor/news-editor.component';
import { NewsListComponent } from './PageComponent/main-menu-page/news-list/news-list.component';
import { PageNotFoundComponent } from './PageComponent/page-not-found/page-not-found.component';
import { UserProfileComponent } from './PageComponent/main-menu-page/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ExitGuard } from './guards/exit.guard';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/main/news-list',
    pathMatch: 'full'
  }, 
  { 
    path: 'login',
    component: LoginPageComponent    
  },
  { 
    path: 'main',
    component: MainMenuPageComponent,
    children:[
      { 
        path: 'news-list',
        component: NewsListComponent,
        children:[
          /*Работает хотя говорили что именованные аутлеты можно размещать на самом верхнем уровне*/      
          { 
            path: 'add',
            component: NewsEditorComponent,
            canDeactivate: [ExitGuard],
            outlet: 'editForm'
          },
          { 
            path: 'edit/:newsId',
            component: NewsEditorComponent,
            canDeactivate: [ExitGuard],
            outlet: 'editForm'
          }
        ]  
      },
      //К вопросу из news-type-filter.component.html
      /*{ 
        path: 'news-list/:newsType',
        component: NewsListComponent
      },*/
      { 
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
        canDeactivate: [ExitGuard]
      }
    ]
  },
  /*Не работает, меняется строка адреса, но не создается компонент*/
  /*{ 
    path: 'add',
    component: NewsEditorComponent,
    outlet: 'editForm'
  },*/   
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