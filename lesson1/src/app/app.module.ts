import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NewsBlockComponent } from './news-block/news-block.component';
import { SinglePostComponent } from './news-block/single-post/single-post.component';
import { NewsModalWindowComponent } from './news-block/news-modal-window/news-modal-window.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { TitlePipePipe } from './title-pipe.pipe';
import { NewsTypePipePipe } from './news-type-pipe.pipe';
import { BgnDDirective } from './bgn-d.directive';
import { RightsDDirective } from './rights-d.directive';

const maskConfig: Partial<IConfig> = {
  validation: true,
  showMaskTyped: true,
  
};

@NgModule({
  declarations: [
    AppComponent,
    NewsBlockComponent,
    SinglePostComponent,
    NewsModalWindowComponent,
    ContextMenuComponent,
    TitlePipePipe,
    NewsTypePipePipe,
    BgnDDirective,
    RightsDDirective
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
