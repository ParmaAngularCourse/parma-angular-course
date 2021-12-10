import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsComponent } from './all-news/news/news.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { EditFormComponent } from './all-news/edit-form/edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    AllNewsComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
