import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AutoComponent } from './auto/auto.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { AutoMainComponent } from './auto-main/auto-main.component';
import { AutoDtpComponent } from './auto-dtp/auto-dtp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PopupMenuComponent } from './popup-menu/popup-menu.component';
import { SecondModuleModule } from './second-module/second-module.module';
import { TestService } from './test.service';

const myComponents1 = [
  AppComponent,
  MainComponent,
  AutoComponent,
  RealEstateComponent,
  AutoMainComponent
];

const myComponents2 = [
  AutoDtpComponent,
    PageNotFoundComponent,
    PopupMenuComponent
];

@NgModule({
  declarations: [
    ...myComponents1,
    ...myComponents2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule/*,
    SecondModuleModule*/
  ],
  //providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
