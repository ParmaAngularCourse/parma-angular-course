import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { MyIfDirective } from './../myDirectives/myNgIf'
import { MyForDirective } from './../myDirectives/myNgFor'

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MyIfDirective,
    MyForDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
