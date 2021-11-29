import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ParentComponentComponent } from './parent-component/parent-component.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { StylesDirective } from './styles.directive';
import { StructDDirective } from './struct-d.directive';
import { GenderPipePipe } from './gender-pipe.pipe';
import { FilterManPipe } from './filter-man.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponentComponent,
    ChildComponentComponent,
    StylesDirective,
    StructDDirective,
    GenderPipePipe,
    FilterManPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
