import { Component, ElementRef, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ChildComponentComponent } from './child-component/child-component.component';
import { ParentComponentComponent } from './parent-component/parent-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('contextMenuComponent') menuComponent!: ChildComponentComponent;
  @ViewChild('contextMenuComponent', {read: ElementRef}) menuComponentTemplate!: ElementRef;
  @ViewChild('title') title!: ElementRef<HTMLElement>;
  @ViewChild('titletemplate') titletemplate!: TemplateRef<HTMLElement>;
  @ViewChild('containerTemplate', {read: ViewContainerRef}) containerTemplate!: ViewContainerRef;
  @ViewChildren(ParentComponentComponent) parentComponent!: QueryList<ParentComponentComponent>;
  ngOnInit() {    
  }

  ngAfterViewInit() {
    
  }

  onShowButtonClick() {
    this.menuComponent.show({top: 500, left: 500});
    console.log(this.menuComponentTemplate);
  }

  constructor(private renderer: Renderer2, private viewContainerRef: ViewContainerRef) {

  }

  onChangeColor() {
      let backColor = this.title.nativeElement.style.background;
      let text = 'Большой, большой текст';

      switch(backColor) {
        case "khaki": backColor = "blue"; break;
        case "blue": backColor = "khaki"; break;
      }

      this.renderer.setStyle(this.title.nativeElement, 'background', backColor);
      this.renderer.setProperty(this.title.nativeElement, 'innerHTML', text + ' ' + backColor);
  }

  isShow = true;
  onShowTemplate() {
    if (this.isShow) {
      this.containerTemplate.createEmbeddedView(this.titletemplate);
    }
    else {
      this.containerTemplate.clear();
    }
    this.isShow = !this.isShow;
  }

  onShowParentClick() {
    this.parentComponent.forEach(item => { console.log(item); })
  }
}
