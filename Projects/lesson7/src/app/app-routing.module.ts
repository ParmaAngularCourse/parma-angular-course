import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AutoDtpComponent } from './auto-dtp/auto-dtp.component';
import { AutoMainComponent } from './auto-main/auto-main.component';
import { AutoComponent } from './auto/auto.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PopupMenuComponent } from './popup-menu/popup-menu.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { ResolveDataService } from './resolve-data.service';
import { SelectivePreloadingStrategy } from './selective-preload-strategy';

// auto
// /auto,  /auto/automain, /auto/automain/bla-bla-bla

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'll-module',
    loadChildren: () => import('./second-module/second-module.module').then(m => m.SecondModuleModule),
    data: {
      preload: false
    }
  },
  {
    path: 'auto',
    component: AutoComponent,
    children: [
      {
        path: '',
        component: AutoMainComponent
      },
      {
        path: 'automain',
        component: AutoMainComponent
      },
      {
        path: 'autodtp/:dtpId',
        component: AutoDtpComponent,
        data: {
          title: 'ДТП'
        }
      }
    ]
  },
  {
    path: 'real-estate',
    //canActivate: [AuthGuard],
    resolve: {
      dataRealEstate: ResolveDataService
    },
    component: RealEstateComponent
  },
  {
    path: 'popupmenu',
    component: PopupMenuComponent,
    outlet: 'menu'
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: SelectivePreloadingStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
